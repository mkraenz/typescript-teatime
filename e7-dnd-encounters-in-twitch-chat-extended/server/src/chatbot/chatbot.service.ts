import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { Document } from 'mongoose';
import { ChatUserstate, Client } from 'tmi.js';
import {
  Adventurer,
  AdventurerDocument,
} from '../adventurer/adventurer.schema';
import { AdventurerService } from '../adventurer/adventurer.service';
import { Battle } from '../domain/battle';
import { IEvent } from '../domain/events';

type Adventurer_ = Adventurer &
  Document &
  Document<any, any, AdventurerDocument>;

const tmiConfig = {
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  channels: ['typescriptteatime'],
};

const banned = ['streamelements'];
const timeBetweenAttacksInSeconds = 15;
const DMs = ['maceisgrace', 'hcustovic1', 'typescriptteatime'];

export type BattleLogSubscriber = (event: IEvent) => void;

enum Command {
  Attack = '!attack',
  Attack1 = '!strike',
  Attack2 = '!hit',
  Attack3 = '!charge',
  Attack4 = '!assault',
  Join = '!join',
  Fire = '!fire',
  Ice = '!ice',
  Heal = '!heal',
  Protect = '!protect',
}
const attackAliases = [
  Command.Attack,
  Command.Attack1,
  Command.Attack2,
  Command.Attack3,
  Command.Attack4,
];

@Injectable()
export class ChatbotService {
  private readonly tmiClient: Client;
  private readonly adventurers: AdventurerService;
  private battle?: Battle;
  private lastLogCount = 0;
  private watchBattleLogs?: NodeJS.Timeout;
  private joinedAdventurers: AdventurerDocument[] = [];
  private listenersToBattleLogChanges: BattleLogSubscriber[] = [];

  constructor(adventurers: AdventurerService) {
    this.adventurers = adventurers;
    this.tmiClient = new Client(tmiConfig);
    if (process.env.DONT_CONNECT_TO_TWITCH !== 'true') this.tmiClient.connect();
    this.tmiClient.on('message', this.handleMessage.bind(this));
  }

  public get battleLog() {
    return this.battle?.log;
  }

  public subscribeToLog(callback: BattleLogSubscriber) {
    this.listenersToBattleLogChanges.push(callback);
  }

  private async handleMessage(
    channel: string,
    tags: ChatUserstate,
    message: string,
    self: boolean,
  ) {
    if (self) return; // Ignore message by chatbot itself

    const username = tags.username;
    if (!username || banned.includes(username)) return;
    const msg = message.toLowerCase();

    if (DMs.includes(username) && msg.includes('!ambush')) {
      if (this.battle) return;
      this.battle = new Battle(timeBetweenAttacksInSeconds);
      this.watchBattleLogs = setInterval(() => this.pollBattleLogs(), 10);
    }
    if (!this.battle) return;

    if (includesACommand(msg)) {
      const hasJoined = this.battle.hasJoined(username);
      if (!hasJoined) {
        return await this.joinParty(username, this.battle);
      }
    }

    if (msg.includes(Command.Join)) {
      return await this.joinParty(username, this.battle);
    }
    if (attackAliases.some((cmd) => msg.includes(cmd))) {
      return this.battle.attack(username);
    }
    if (msg.includes(Command.Fire)) {
      return this.battle.castFire(username);
    }
    if (msg.includes(Command.Ice)) {
      return this.battle.castIce(username);
    }
    if (msg.includes(Command.Heal)) {
      // using message to handle uppercase characters in username receiving heal
      return this.handleHeal(this.battle, message, username);
    }
    if (msg.includes(Command.Protect)) {
      return this.handleProtect(this.battle, message, username);
    }
    if (DMs.includes(username) && msg.includes('!flee')) {
      return this.endBattle(true);
    }
  }

  /**
   * msg should be like:
   * !heal @maceisgrace
   */
  private handleHeal(battle: Battle, msg: string, username: string) {
    const healed = this.getTargetUsername(msg);
    const singleTargetCast = healed && healed[0] === '@';
    if (singleTargetCast) {
      const healedTargetUser = healed.substring(1);
      return battle.heal(username, healedTargetUser);
    }
    return battle.healParty(username);
  }

  private getTargetUsername(msg: string) {
    // filter for ignoring whitespace
    return msg.split(' ').filter((m) => !isEmpty(m))[1];
  }

  /**
   * msg should be like:
   * !protect @maceisgrace
   */
  private handleProtect(battle: Battle, msg: string, username: string) {
    // msg should be like:
    // !protect @maceisgrace
    const shielded = this.getTargetUsername(msg);
    const singleTargetCast = shielded && shielded[0] === '@';
    if (singleTargetCast) {
      const protectedTargetUser = shielded.substring(1);
      return battle.castProtect(username, protectedTargetUser);
    }
  }

  private async pollBattleLogs() {
    this.notifyBattleLogSubscribers();
    const battleEnded = this.battle?.log.find(
      (e) => e.type === 'monster killed' || e.type === 'party killed',
    );
    if (battleEnded) {
      await this.endBattle();
    }
  }

  private notifyBattleLogSubscribers() {
    const hasNewEvents = this.battle!.log.length > this.lastLogCount;
    if (hasNewEvents) {
      for (let i = this.lastLogCount; i < this.battle!.log.length; i++) {
        const newEvent = this.battle!.log[i];
        this.listenersToBattleLogChanges.forEach((callback) => {
          callback(newEvent);
        });
      }
      this.lastLogCount = this.battle!.log.length;
    }
  }

  private async saveAdventurerToDatabase() {
    for (const adventurer of this.joinedAdventurers) {
      await adventurer.save();
    }
  }

  private rewardAdventurers() {
    this.joinedAdventurers.forEach((adventurer) =>
      adventurer.addExperience(100),
    );
  }

  private async endBattle(partyRanAway = false) {
    if (!partyRanAway) this.rewardAdventurers();
    this.notifyBattleLogSubscribers(); // final notification before clearing variables

    global.clearInterval(this.watchBattleLogs!);
    this.battle?.endBattle();
    this.watchBattleLogs = undefined;
    this.battle = undefined;
    this.lastLogCount = 0;

    await this.saveAdventurerToDatabase();
    this.joinedAdventurers = [];
    console.log('chatbot: battle ended');
  }

  private async joinParty(username: string, battle: Battle) {
    const adventurer = await this.adventurers.findOneOrCreate(
      username,
      battle.log,
    );
    try {
      battle.join(adventurer);
      this.joinedAdventurers.push(adventurer);
    } catch (error) {
      if ((error as Error).message.includes('already in the party')) {
        console.log(`${username} can only !join once. Ignoring.`);
        // expected error. ignore
      } else {
        throw error;
      }
    }
  }
}

const includesACommand = (msg: string) =>
  Object.values(Command).some((cmd) => msg.includes(cmd));
