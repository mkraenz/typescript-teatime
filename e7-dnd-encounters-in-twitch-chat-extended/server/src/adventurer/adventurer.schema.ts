import { prop } from '@typegoose/typegoose';
import { random } from 'lodash';
import { IEvent } from '../domain/events';
import type { Monster } from '../domain/monster';

export class Adventurer {
  @prop({ unique: true, required: true })
  public username!: string;

  @prop({ default: 150 })
  public hp = 150;

  @prop({ default: 1 })
  public level = 1;

  @prop({ default: 0 })
  public experience = 0;

  private _log: IEvent[] = [];

  public set log(log: IEvent[]) {
    this._log = log;
  }

  private hasAttackedThisTurn = false;

  public takeDamage(damage: number) {
    this.hp = this.hp - damage;
    this._log.push({
      type: 'damage received',
      damage,
      target: this.username,
      hpLeft: this.hp,
      isMonster: false,
    });

    if (this.hp <= 0) {
      this.log.push({ type: 'adventurer killed', name: this.username });
    }
  }

  public unblockAttack(): void {
    this.hasAttackedThisTurn = false;
  }

  public attack(monster: Monster) {
    if (!this.hasAttackedThisTurn) {
      const damage = random(19) + 1;
      this._log.push({
        type: 'attack',
        isMonster: false,
        attacker: this.username,
        target: monster.name,
      });
      monster.takeDamage(damage);
    }
  }
}
