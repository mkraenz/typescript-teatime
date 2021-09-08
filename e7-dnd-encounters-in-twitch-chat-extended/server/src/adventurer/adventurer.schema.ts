import { prop } from '@typegoose/typegoose';
import { random } from 'lodash';
import { IEvent } from '../domain/events';
import type { Monster } from '../domain/monster';

export class Adventurer {
  @prop({ unique: true, required: true })
  public username!: string;

  @prop({ default: 150 })
  public maxHp = 150;

  @prop({ default: 150 })
  public hp = 150;

  @prop({ default: 1 })
  public level = 1;

  @prop({ default: 0 })
  public experience = 0;

  private log: IEvent[] = [];

  public setLog(log: IEvent[]) {
    this.log = log;
  }

  public get isDead() {
    return this.hp <= 0;
  }

  private hasActedThisTurn = false;

  public takeDamage(damage: number) {
    this.hp = this.hp - damage;
    this.log.push({
      type: 'damage received',
      damage,
      target: this.username,
      hpLeft: this.hp,
      isMonster: false,
    });

    if (this.isDead) {
      this.log.push({ type: 'adventurer killed', name: this.username });
    }
  }

  public heal(receiver: string) {
    if (this.isDead) return;
    if (this.hasActedThisTurn) return;

    const amount = random(15) + this.level;
    this.log.push({
      type: 'heal cast',
      receiver,
      actor: this.username,
      amount,
    });
    this.hasActedThisTurn = true;
    return amount;
  }

  public receivesHeal(healedHp: number) {
    if (this.isDead) return;

    this.log.push({
      type: 'received heal',
      target: this.username,
      amount: healedHp,
      currentHp: this.hp,
    });
    this.hp += healedHp;
    if (this.hp > this.maxHp) {
      this.hp = this.maxHp;
    }
  }

  public unblockAttack(): void {
    this.hasActedThisTurn = false;
  }

  public attack(monster: Monster) {
    if (this.isDead) return;
    if (this.hasActedThisTurn) return;

    const damage = random(19) + this.level;
    this.log.push({
      type: 'attack',
      isMonster: false,
      attacker: this.username,
      target: monster.name,
    });
    this.hasActedThisTurn = true;
    monster.takeDamage(damage);
  }

  public castFire(monster: Monster) {
    if (this.isDead) return;
    if (this.hasActedThisTurn) return;

    const damage = random(19) + this.level;
    this.log.push({
      type: 'fire cast',
      actor: this.username,
      target: monster.name,
    });
    this.hasActedThisTurn = true;
    monster.takeDamage(damage);
  }
}
