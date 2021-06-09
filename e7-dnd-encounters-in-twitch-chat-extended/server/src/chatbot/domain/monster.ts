import { random } from 'lodash';
import { Adventurer } from '../../adventurer/adventurer.schema';

export class Monster {
  public name: string;
  public area: string;
  public hp: number;

  constructor({ name, area, hp }: { name: string; area: string; hp: number }) {
    this.area = area;
    this.hp = hp;
    this.name = name;
  }

  public get isDead() {
    return this.hp < 0;
  }

  public attack(adventurer: Adventurer) {
    const damage = random(19) + 1;
    adventurer.takeDamage(damage);
  }

  public takeDamage(damage: number) {
    this.hp = this.hp - damage;
  }
}
