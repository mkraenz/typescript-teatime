import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import {
  BattleLogSubscriber,
  ChatbotService,
} from '../chatbot/chatbot.service';
import { IEvent } from '../domain/events';
import { Battle } from './battle.schema';

type Awaited<T> = T extends Promise<infer U> ? U : never;

interface ISubscribable {
  appendToLog: BattleLogSubscriber;
}

@Injectable()
export class BattleService implements ISubscribable {
  private battle: Awaited<ReturnType<BattleService['create']>> | null = null;
  // WORKAROUND: battle.log.get is shimmed by mongoose, thus returning only the result of the database. Hence battle.log.push({}) does effectively nothing
  private log: IEvent[] | null = null;
  private hasChanged = false;
  private saveDaemon: NodeJS.Timeout | null = null;

  constructor(
    @InjectModel(Battle)
    private battleModel: ReturnModelType<typeof Battle>,
    chatbot: ChatbotService,
  ) {
    // TODO fix type
    chatbot.subscribeToLog(this.appendToLog.bind(this));
  }

  async create(log: IEvent[]) {
    const battle = new this.battleModel();
    battle.log = log;
    const saved = await battle.save();
    return saved;
  }

  async findAll() {
    return this.battleModel.find().exec();
  }

  async findOne(id: string) {
    return this.battleModel.findById(id).exec();
  }

  private startSaveDaemon() {
    // avoid PromiseRejection: MongooseError [ParallelSaveError]: Can't save() the same doc multiple times in parallel by only saving every x seconds if the document has been changed
    this.saveDaemon = setInterval(() => {
      if (this.hasChanged) {
        this.battle?.save();
        this.hasChanged = false;

        if (this.battleEnded) {
          this.battle = null;
          if (!this.saveDaemon)
            throw new Error(
              'this should not happen. did you assign this.saveDaemon?',
            );
          clearInterval(this.saveDaemon);
          this.saveDaemon = null;
        }
      }
    }, 3000);
  }

  private get battleEnded() {
    return (
      this.battle?.log.find((e) => e.type === 'party killed') ||
      this.battle?.log.find((e) => e.type === 'monster killed')
    );
  }

  public async appendToLog(event: IEvent) {
    if (!this.battle) {
      this.battle = await this.create([event]);
      this.log = [event];
      this.startSaveDaemon();
    } else {
      this.log?.push(event);
      this.battle.log = this.log || [];

      this.hasChanged = true;
    }
  }
}
