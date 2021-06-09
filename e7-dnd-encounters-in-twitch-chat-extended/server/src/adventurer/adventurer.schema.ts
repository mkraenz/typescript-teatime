import { prop } from '@typegoose/typegoose';
import { random } from 'lodash';
import { Monster } from '../chatbot/domain/monster';

export class Adventurer {
  @prop({ unique: true, required: true })
  public username!: string;

  @prop({ default: 150 })
  public hp: number = 150;

  @prop({ default: 1 })
  public level: number = 1;

  @prop({ default: 0 })
  public experience: number = 0;

  public get isDead() {
    return this.hp < 0;
  }

  private hasAttackedThisTurn = false;

  public takeDamage(damage: number) {
    this.hp = this.hp - damage;
  }

  public unblockAttack(): void {
    this.hasAttackedThisTurn = false;
  }

  // TODO probably need abstraction IMonster due to cyclic import
  public attack(monster: Monster) {
    if (!this.hasAttackedThisTurn) {
      const damage = random(19) + 1;
      monster.takeDamage(damage);
    }
  }
}
