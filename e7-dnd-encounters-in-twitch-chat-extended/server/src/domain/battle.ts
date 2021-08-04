import { isEmpty, random } from 'lodash';
import type { Adventurer } from '../adventurer/adventurer.schema';
import { pick } from '../common/utils';
import { IEvent } from './events';
import { Monster } from './monster';
import { monsters } from './monsters.json';

export class Battle {
  private monster: Monster;
  private party: Adventurer[] = [];
  private gameloop: NodeJS.Timeout | null;
  public log: IEvent[] = [];

  constructor(timeTillAttackInSeconds: number) {
    this.monster = this.getMonster();
    this.log.push({
      type: 'monster appeared',
      monster: pick(this.monster, ['area', 'hp', 'name']),
    });
    // start game loop
    this.gameloop = global.setInterval(
      () => this.onTick(),
      timeTillAttackInSeconds * 1000,
    );
  }

  public get adventurerNames() {
    return this.party.map((adventurer) => adventurer.username);
  }

  public get monsterName() {
    return this.monster.name;
  }

  public attack(adventurerUsername: string) {
    const adventurer = this.party.find(
      (adventurer) => adventurer.username === adventurerUsername,
    );
    if (!adventurer) return;
    adventurer.attack(this.monster);
    if (this.monster.isDead) {
      this.endBattle();
    }
  }

  private onTick() {
    if (this.monster.isDead) {
      this.endBattle();
    }

    const aliveAdventurers = this.party.filter((a) => !a.isDead);
    if (isEmpty(aliveAdventurers)) {
      this.log.push({
        type: 'party killed',
        monster: this.monster.name,
      });
      return;
    }
    const randomAdventurer =
      aliveAdventurers[random(aliveAdventurers.length - 1)];
    this.monster.attack(randomAdventurer);
    this.party.forEach((adventurer) => adventurer.unblockAttack());
  }

  /** Called from external */
  public endBattle() {
    if (this.gameloop) {
      global.clearInterval(this.gameloop);
      this.gameloop = null;
    }
  }

  private getMonster() {
    const data = { ...monsters[random(monsters.length - 1)] };
    return new Monster(this.log, data);
  }

  public join(adventurer: Adventurer) {
    if (this.party.some((a) => a.username === adventurer.username)) {
      throw new Error(`${adventurer.username} is already in the party`);
    }
    this.party.push(adventurer);
    this.log.push({
      type: 'join',
      member: adventurer.username,
      hp: adventurer.hp,
      maxHp: adventurer.maxHp,
    });
  }
}
