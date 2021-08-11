import { Injectable } from '@nestjs/common';
import { DocumentType } from '@typegoose/typegoose';
import { ChatUserstate, Client } from 'tmi.js';
import { Adventurer } from '../adventurer/adventurer.schema';
import { AdventurerService } from '../adventurer/adventurer.service';
import { Battle } from '../domain/battle';
import { IEvent } from '../domain/events';

const tmiConfig = {
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  channels: ['typescriptteatime'],
};

const banned = ['streamelements'];
const timeTillAttackInSeconds = 30;
const DMs = ['maceisgrace', 'hcustovic1', 'typescriptteatime'];

@Injectable()
export class ChatbotService {
  private readonly tmiClient: Client;
  private readonly adventurers: AdventurerService;
  private battle?: Battle;
  private lastLogCount = 0;
  private watchBattleLogs?: NodeJS.Timeout;
  private joinedAdventurers: DocumentType<Adventurer>[] = [];
  private listenersToBattleLogChanges: ((log: IEvent[]) => void)[] = [];

  constructor(adventurers: AdventurerService) {
    this.adventurers = adventurers;
    this.tmiClient = new Client(tmiConfig);
    if (process.env.DONT_CONNECT_TO_TWITCH !== 'true') this.tmiClient.connect();
    this.tmiClient.on('message', this.handleMessage.bind(this));
  }

  public get battleLog() {
    return this.battle?.log;
  }

  public subscribeToLog(callback: (log: IEvent[]) => void) {
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
      this.battle = new Battle(timeTillAttackInSeconds);
      this.watchBattleLogs = setInterval(() => this.pollBattleLogs(), 10);
    }
    if (!this.battle) return;

    if (msg.includes('!join')) {
      return await this.joinParty(username, this.battle);
    }
    if (msg.includes('!attack')) {
      return this.battle.attack(username);
    }
    if (msg.includes('!heal')) {
      // using message to handle uppercase characters in username receiving heal
      return this.handleHeal(this.battle, message, username);
    }
    if (DMs.includes(username) && msg.includes('!flee')) {
      return this.endBattle();
    }
  }

  private handleHeal(battle: Battle, msg: string, username: string) {
    const healed = msg.split(' ')[1];
    if (!healed || healed[0] !== '@')
      return say(`Invalid command by @${username}: ${msg}`);
    const healedWithoutAt = healed.substring(1);
    return battle.heal(username, healedWithoutAt);
  }

  private async pollBattleLogs() {
    const hasNewEvents = this.battle!.log.length > this.lastLogCount;
    if (hasNewEvents) {
      for (let i = this.lastLogCount; i < this.battle!.log.length; i++) {
        const newEvent = this.battle!.log[i];
        this.renderBattleEvent(newEvent);
        this.listenersToBattleLogChanges.forEach((callback) => {
          callback([newEvent]);
        });
      }
      this.lastLogCount = this.battle!.log.length;
    }
    const battleEnded = this.battle?.log.find(
      (e) => e.type === 'monster killed' || e.type === 'party killed',
    );
    if (battleEnded) {
      await this.endBattle();
    }
  }
  private async saveAdventurerToDatabase() {
    for (const adventurer of this.joinedAdventurers) {
      adventurer.experience += 100;
      adventurer.level = 1 + Math.floor(adventurer.experience / 300);
      await adventurer.save();
    }
  }

  private async endBattle() {
    global.clearInterval(this.watchBattleLogs!);
    this.battle?.endBattle();
    this.watchBattleLogs = undefined;
    this.battle = undefined;
    this.lastLogCount = 0;

    await this.saveAdventurerToDatabase();
    this.joinedAdventurers = [];
  }

  private renderBattleEvent(event: IEvent) {
    switch (event.type) {
      case 'adventurer killed':
        return say(`⚰️⚰️⚰️ Oh no! @${event.name} has been killed.`);
      case 'attack':
        if (event.isMonster)
          return say(`🔥 😈 ${event.attacker} attacks @${event.target}.`);
        return say(`🗡️ @${event.attacker} attacks 😈 ${event.target}.`);
      case 'damage received':
        return say(
          `${event.target} received ${event.damage} damage. ${event.hpLeft} ❤️ left.`,
        );
      case 'healed':
        return say(
          `${event.actor} tries to heal ${event.receiver} for ${event.amount}`,
        );
      case 'received heal':
        return say(
          `${event.target} got healed for ${event.amount} to ${event.currentHp} ❤️.`,
        );
      case 'join':
        say(`⚔️ @${event.member} joined the battle alongside you.`);
        return say(
          `@${this.battle!.adventurerNames.join(
            ', @',
          )} stand united in battle.`,
        );
      case 'monster appeared':
        return say(
          `⚔️ An ambush! You're party is in a ${event.monster.area}. A wild 😈 ${event.monster.name} appeared. Be prepared! The attack starts in ${timeTillAttackInSeconds} seconds. ❤️: ${event.monster.hp}`,
        );
      case 'monster killed':
        return say(
          `🏆🏆🏆🎉🏅 VICTORY! 😈 ${
            event.monster
          } has been struck down. @${this.battle!.adventurerNames.join(
            ', @',
          )} each earned 100 EXP.`,
        );
      case 'party killed':
        return say(
          `🔥🔥🔥🔥🔥 ⚰️⚰️⚰️⚰️ Defeat! The battle is lost. The world must rely on another group of adventurers. 😈 ${event.monster} lived happily ever after.`,
        );
    }
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

const say = (text: string) => {
  console.log(text);
};
