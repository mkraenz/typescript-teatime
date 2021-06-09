import { Injectable } from '@nestjs/common';
import { random } from 'lodash';
import { AdventurerService } from 'src/adventurer/adventurer.service';
import { ChatUserstate, Client } from 'tmi.js';
import { Battle } from './domain/battle';
import { monsters } from './domain/monsters.json';

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
    const adventurer = await this.adventurers.create({ username });
    battle.join(adventurer);
    say(`⚔️ ${username} joined the battle alongside you.`);
    say(`${battle.adventurerNames.join(', ')} stand united in battle.`);
  }
}

const say = (text: string) => {
  console.log(text);
};

function winBattle(monster: Monster) {
  if (timerInterval) {
    global.clearInterval(timerInterval);
  }
}

function userAttack(user: Adventurer, monster: Monster) {
  user.hasAttacked = true;
  const damage = random(19) + 1;
  monster.hp -= damage;
  say(
    `🗡️ @${user.username} dealt ${damage} damage to 😈 ${monster.name}. ${monster.hp} ❤️ left.`,
  );
}

const startRandomBattle = () => {
  monster = { ...monsters[random(monsters.length - 1)] };
  say(
    `⚔️ An ambush! You're party is in a ${monster.area}. A wild 😈 ${monster.name} appeared. Be prepared! The attack starts in ${timeTillAttackInSeconds} seconds. ❤️: ${monster.hp}`,
  );
  if (!timerInterval) {
    timerInterval = setInterval(monsterAttacks, timeTillAttackInSeconds * 1000);
  }
};

function monsterAttacks() {
  // const randomUser = party[random(party.length - 1)];
  // const monsterTarget = randomUser;
  // if (!monsterTarget) {
  //   return loseBattle();
  // }
  // const damage = random(19) + 1;
  // monsterTarget.hp -= damage;
  if (monsterTarget.hp < 0) {
    party = party.filter((u) => u.username !== monsterTarget.username);
    // TODO fix definite assigments (!)
    say(
      `⚰️⚰️⚰️ Oh no! @${monsterTarget.username} has been killed by 😈 ${
        monster!.name
      }`,
    );
  }

  // party.forEach((user) => (user.hasAttacked = false));

  say(
    `🔥 😈 ${monster!.name} dealt ${damage} damage to @${
      monsterTarget.username
    }. ${monsterTarget.username} has ${monsterTarget.hp} ❤️ left.`,
  );
}

function loseBattle() {
  console.log('Battle lost');
  if (timerInterval) {
    global.clearInterval(timerInterval);
  }
}
