import { Injectable } from '@nestjs/common';
import { IEvent } from '../domain/events';
import { ChatbotService } from './chatbot.service';

@Injectable()
export class EventLogToConsoleService {
  constructor(chatbot: ChatbotService) {
    chatbot.subscribeToLog((newLogEntry) =>
      this.logBattleEventToConsole(newLogEntry),
    );
  }

  private logBattleEventToConsole(event: IEvent) {
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
      case 'heal cast':
        return say(
          `${event.actor} tries to heal ${event.receiver} for ${event.amount}`,
        );
      case 'received heal':
        return say(
          `${event.target} got healed for ${event.amount} to ${event.currentHp} ❤️.`,
        );
      case 'join':
        return say(`⚔️ @${event.member} joined the battle alongside you.`);
      case 'monster appeared':
        return say(
          `⚔️ An ambush! You're party is in a ${event.monster.area}. A wild 😈 ${event.monster.name} appeared. Be prepared! The attack starts soon. ❤️: ${event.monster.hp}`,
        );
      case 'monster killed':
        return say(
          `🏆🏆🏆🎉🏅 VICTORY! 😈 ${event.monster} has been struck down. Each adventurer received 100 EXP.
          `,
        );
      case 'party killed':
        return say(
          `🔥🔥🔥🔥🔥 ⚰️⚰️⚰️⚰️ Defeat! The battle is lost. The world must rely on another group of adventurers. 😈 ${event.monster} lived happily ever after.`,
        );
      case 'protect cast':
        return say(`${event.actor} tries to cast Protect on ${event.target}`);
      case 'received protect cast':
        return say(
          `${event.target} received Protect spell. All damage is halfed!`,
        );
      case 'leveled up':
        return say(`🏅🏅🏅🏅 @${event.target} reached level ${event.level}!`);
    }
  }
}

const say = (text: string) => {
  console.log(text);
};
