import { Injectable } from '@nestjs/common';
import { IEvent } from 'src/domain/events';
import { ChatUserstate, Client } from 'tmi.js';
import { AdventurerService } from '../adventurer/adventurer.service';
import { Battle } from '../domain/battle';

const tmiConfig = {
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  channels: ['typescriptteatime'],
};

const timeTillAttackInSeconds = 30;

@Injectable()
export class ChatbotService {
  private readonly tmiClient: Client;
  private readonly adventurers: AdventurerService;
  private battle?: Battle;
  private lastLogCount = 0;
  private watchBattleLogs?: NodeJS.Timeout;

  constructor(adventurers: AdventurerService) {
    this.adventurers = adventurers;
    this.tmiClient = new Client(tmiConfig);
    this.tmiClient.connect();
    this.tmiClient.on('message', this.handleMessage.bind(this));
  }

  private async handleMessage(
    channel: string,
    tags: ChatUserstate,
    message: string,
    self: boolean,
  ) {
    if (self) return; // Ignore message by chatbot itself

    const username = tags.username;
    if (!username) return;
    const msg = message.toLowerCase();

    if (msg === '!ambush') {
      this.battle = new Battle(timeTillAttackInSeconds);
      this.watchBattleLogs = setInterval(() => this.pollBattleLogs(), 10);
    }
    if (!this.battle) return;

    if (msg.includes('!join')) {
      await this.joinParty(username, this.battle);
    }
    if (msg.includes('!attack')) {
      this.battle.attack(username);
    }
  }

  private pollBattleLogs() {
    if (this.battle!.log.length > this.lastLogCount) {
      for (let i = this.lastLogCount; i < this.battle!.log.length; i++) {
        this.renderBattleEvent(this.battle!.log[i]);
        // console.log(JSON.stringify(this.battle!.log[i], null, 2));
      }
      this.lastLogCount = this.battle!.log.length;
    }
    const battleEnded = this.battle?.log.find(
      (e) => e.type === 'monster killed' || e.type === 'party killed',
    );
    if (battleEnded) {
      this.endBattle();
    }
  }

  private endBattle() {
    clearInterval(this.watchBattleLogs!);
    this.battle = undefined;
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
          )} earned 300 EXP.`,
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
    battle.join(adventurer);
  }
}

const say = (text: string) => {
  console.log(text);
};
