import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { ChatbotService } from '../chatbot/chatbot.service';
import { IEvent } from '../domain/events';
import { Battle } from './battle.schema';

type Awaited<T> = T extends Promise<infer U> ? U : never;

@Injectable()
export class BattleService {
  private battle: Awaited<ReturnType<BattleService['create']>> | null = null;
  private hasChanged = false;

  constructor(
    @InjectModel(Battle)
    private battleModel: ReturnModelType<typeof Battle>,
    private readonly chatbot: ChatbotService,
  ) {
    // TODO fix type
    chatbot.subscribeToLog(
      (this.appendLogs.bind(this) as unknown) as (logs: IEvent[]) => void,
    );

    // avoid PromiseRejection: MongooseError [ParallelSaveError]: Can't save() the same doc multiple times in parallel by only saving every x seconds if the document has been changed
    setInterval(() => {
      if (this.hasChanged) {
        this.battle?.save();
        this.hasChanged = false;
      }
    }, 10000);
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

  private async appendLogs(logs: IEvent[]) {
    if (!this.battle) {
      this.battle = await this.create(logs);
    } else {
      this.battle.log.push(...logs);
      this.hasChanged = true;
    }
  }
}
