import { Injectable } from '@nestjs/common';
import { random } from 'lodash';
import { ChatUserstate, Client } from 'tmi.js';
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

interface Monster {
  name: string;
  area: string;
  type: string;
  hp: number;
}
interface Adventurer {
  username: string;
  hasAttacked: boolean;
  hp: number;
}

let monster: Monster | null = null;

let party: Adventurer[] = [];
let timerInterval: null | NodeJS.Timeout = null;
const timeTillAttackInSeconds = 20;

@Injectable()
export class ChatbotService {
  private tmiClient: Client;

  constructor() {
    this.tmiClient = new Client(tmiConfig);
    this.tmiClient.connect();
    this.tmiClient.on('message', handleMessage);
  }
}

const say = (text: string) => {
  console.log(text);
};

const handleMessage = (
  channel: string,
  tags: ChatUserstate,
  message: string,
  self: boolean,
) => {
  if (self) return; // Ignore echoed messages.
  const username = tags.username;
  if (!username) return;
  const msg = message.toLowerCase();
  say(`${username}: ${msg}`); // TODO remove

  if (msg === '!ambush') startRandomBattle();
  if (msg.includes('!join')) joinParty(username);
  if (msg.includes('!attack')) {
    const user = party.find((u) => u.username === username);
    const canAttack = monster && user && !user.hasAttacked;
    if (monster && user && canAttack) {
      userAttack(user, monster);
      if (monster.hp <= 0) winBattle(monster);
    }
  }
};

function winBattle(monster: Monster) {
  if (timerInterval) {
    global.clearInterval(timerInterval);
  }
  say(
    `🏆🏆🏆🎉🏅 VICTORY! 😈 ${monster.name} has been struck down. @${party
      .map((u) => u.username)
      .join(', @')} earned x00 EXP.`,
  );
}

function userAttack(user: Adventurer, monster: Monster) {
  user.hasAttacked = true;
  const damage = random(19) + 1;
  monster.hp -= damage;
  say(
    `🗡️ @${user.username} dealt ${damage} damage to 😈 ${monster.name}. ${monster.hp} ❤️ left.`,
  );
}

function joinParty(username: string) {
  party.push({ username: username, hasAttacked: false, hp: 150 });
  say(`⚔️ ${username} joined the battle alongside you.`);
  say(`${party.map((u) => u.username).join(', ')} stand united in battle.`);
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
  const randomUser = party[random(party.length - 1)];
  const monsterTarget = randomUser;
  if (!monsterTarget) {
    return loseBattle();
  }
  const damage = random(19) + 1;
  monsterTarget.hp -= damage;
  if (monsterTarget.hp < 0) {
    party = party.filter((u) => u.username !== monsterTarget.username);
    // TODO fix definite assigments (!)
    say(
      `⚰️⚰️⚰️ Oh no! @${monsterTarget.username} has been killed by 😈 ${
        monster!.name
      }`,
    );
  }

  party.forEach((user) => (user.hasAttacked = false));

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
  say(
    `🔥🔥🔥🔥🔥 ⚰️⚰️⚰️⚰️ Defeat! The battle is lost. The world must rely on another group of adventurers. 😈 ${
      monster!.name
    } lived happily ever after.`,
  );
}
