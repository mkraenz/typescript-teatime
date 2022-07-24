import { prop } from '@typegoose/typegoose';
import { ceil, random } from 'lodash';
import { IEvent } from '../domain/events';
import type { Monster } from '../domain/monster';

export class Adventurer {
  @prop({ unique: true, required: true, type: String })
  public username!: string;

  @prop({ default: 150, type: Number })
  public maxHp = 150;

  @prop({ default: 150, type: Number })
  public hp = 150;

  @prop({ default: 1, type: Number })
  public level = 1;

  @prop({ default: 0, type: Number })
  public experience = 0;

  @prop({ default: false, type: Boolean })
  public isProtected = false;

  private log!: IEvent[];

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

  public addExperience(exp: number, forceUpdateLevel = false) {
    this.experience += exp;
    // 1 -> 2  100xp
    // 2 -> 3  300xp
    // 3 -> 4  600xp
    // 4 -> 5  1200xp
    // https://www.wolframalpha.com/input?i=1+%2B+floor%28+%28x+%2F+100%29+%5E+%282+%2F3%29%29+where+x+in+100+to+700
    const level = 1 + Math.floor(Math.pow(this.experience / 100, 2 / 3));
    const leveledUp = level > this.level;
    if (forceUpdateLevel) {
      this.level = level;
    } else if (leveledUp) {
      this.level = level;
      this.log.push({
        type: 'leveled up',
        level,
        target: this.username,
      });
    }
  }

  private get canAct() {
    return !this.hasActedThisTurn && !this.isDead;
  }

  public heal(receiver: string) {
    if (!this.canAct) return;

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

  public healParty(partySize: number) {
    if (!this.canAct) return;

    const amount = ceil(random(12) / partySize);
    this.log.push({
      type: 'heal party cast',
      actor: this.username,
      amount,
    });
    // TODO decorator to exhaust hasActedThisTurn
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

  public receiveProtectCast() {
    if (this.isDead) return;

    this.log.push({
      type: 'received protect cast',
      target: this.username,
    });

    this.isProtected = true;
  }

  public unblockAttack(): void {
    this.hasActedThisTurn = false;
  }

  public attack(monster: Monster) {
    if (!this.canAct) return;

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
    if (!this.canAct) return;

    const damage = random(19) + this.level;
    this.log.push({
      type: 'fire cast',
      actor: this.username,
      target: monster.name,
    });
    this.hasActedThisTurn = true;
    monster.takeDamage(damage);
  }

  public castIce(monster: Monster) {
    if (!this.canAct) return;

    const damage = random(19) + this.level;
    this.log.push({
      type: 'ice cast',
      actor: this.username,
      target: monster.name,
    });
    this.hasActedThisTurn = true;
    monster.takeDamage(damage);
  }

  castProtect(target: string) {
    if (!this.canAct) return;

    this.log.push({
      type: 'protect cast',
      target,
      actor: this.username,
    });
    this.hasActedThisTurn = true;
    return true;
  }
}
