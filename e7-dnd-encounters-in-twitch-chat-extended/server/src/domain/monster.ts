import { random } from 'lodash';
import type { Adventurer } from '../adventurer/adventurer.schema';
import { IEvent } from './events';

export class Monster {
  public name: string;
  public area: string;
  public hp: number;
  private log: IEvent[];

  constructor(
    log: IEvent[],
    { name, area, hp }: { name: string; area: string; hp: number },
  ) {
    this.log = log;
    this.area = area;
    this.hp = hp;
    this.name = name;
  }

  public get isDead() {
    return this.hp < 0;
  }

  public attack(adventurer: Adventurer) {
    const damage = random(19) + 1;
    this.log.push({
      type: 'attack',
      isMonster: true,
      attacker: this.name,
      target: adventurer.username,
    });
    adventurer.takeDamage(damage);
  }

  public takeDamage(damage: number) {
    this.hp = this.hp - damage;
    this.log.push({
      type: 'damage received',
      damage,
      target: this.name,
      hpLeft: this.hp,
      isMonster: true,
    });
    if (this.hp <= 0) {
      this.log.push({ type: 'monster killed', monster: this.name });
    }
  }
}
