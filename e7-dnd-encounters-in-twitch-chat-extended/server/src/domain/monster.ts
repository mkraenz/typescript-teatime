import { random } from 'lodash';
import { Adventurer } from '../adventurer/adventurer.schema';
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
    this.log.push({ type: 'attack' });
    adventurer.takeDamage(damage);
  }

  public takeDamage(damage: number) {
    this.hp = this.hp - damage;
    this.log.push({ type: 'damage received' });
  }
}
