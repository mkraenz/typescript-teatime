import { Injectable } from '@nestjs/common';
import { ChatUserstate, Client } from 'tmi.js';
import { AdventurerService } from '../adventurer/adventurer.service';
import { Battle } from '../domain/battle';

const tmiConfig = {
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  //  TODO for writing to Twitch chat
  //   identity: {
  //     username: 'bot-name',
  //     password: 'oauth:my-bot-token',
  //   },
  channels: ['typescriptteatime'],
};

@Injectable()
export class ChatbotService {
  private readonly tmiClient: Client;
  private readonly adventurers: AdventurerService;
  private battle: Battle | null = null;
  private lastLogCount = 0;

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
      this.battle = new Battle();
      setInterval(() => {
        if (this.battle!.log.length > this.lastLogCount) {
          for (let i = this.lastLogCount; i < this.battle!.log.length; i++) {
            console.log(JSON.stringify(this.battle!.log[i], null, 2));
          }
          this.lastLogCount = this.battle!.log.length;
        }
      }, 10);
    }
    if (!this.battle) return;

    if (msg.includes('!join')) {
      await this.joinParty(username, this.battle);
    }
    if (msg.includes('!attack')) {
      this.battle.attack(username);
      if (this.battle.winner === 'party') {
        this.onVictory();
      }
    }
    // TODO should be called on battle.gameloop tick
    if (this.battle.winner === 'monster') {
      this.onDefeat();
    }
  }

  private onDefeat() {
    say(
      `🔥🔥🔥🔥🔥 ⚰️⚰️⚰️⚰️ Defeat! The battle is lost. The world must rely on another group of adventurers. 😈 ${this.battle?.monsterName} lived happily ever after.`,
    );
  }

  private onVictory() {
    say(
      `🏆🏆🏆🎉🏅 VICTORY! 😈 ${
        this.battle?.monsterName
      } has been struck down. @${this.battle?.adventurerNames.join(
        ', @',
      )} earned x00 EXP.`,
    );
  }

  private async joinParty(username: string, battle: Battle) {
    // TODO handle case of existing adventurer
    const adventurer = await this.adventurers.create({ username }, battle.log);
    battle.join(adventurer);
    say(`⚔️ ${username} joined the battle alongside you.`);
    say(`${battle.adventurerNames.join(', ')} stand united in battle.`);
  }
}

const say = (text: string) => {
  // console.log(text);
};
