import { isEmpty, random } from 'lodash';
import type { Adventurer } from '../adventurer/adventurer.schema';
import { pick } from '../common/utils';
import { IEvent } from './events';
import { Monster } from './monster';
import { monsters } from './monsters.json';

export class Battle {
  private monster: Monster;
  private party: Adventurer[] = [];
  private gameloop: NodeJS.Timeout | null = null;
  public log: IEvent[] = [];

  constructor(private timeTillAttackInSeconds: number) {
    this.monster = this.getMonster();
    this.log.push({
      type: 'monster appeared',
      monster: pick(this.monster, ['area', 'hp', 'name']),
      turnInterval: timeTillAttackInSeconds * 1000,
    });
  }

  public get adventurerNames() {
    return this.party.map((adventurer) => adventurer.username);
  }

  public get monsterName() {
    return this.monster.name;
  }

  public attack(username: string) {
    const adventurer = this.getAdventurer(username);
    if (!adventurer) return;
    adventurer.attack(this.monster);
    if (this.monster.isDead) {
      this.endBattle();
    }
  }

  public castFire(username: string) {
    const adventurer = this.getAdventurer(username);
    if (!adventurer) return;
    adventurer.castFire(this.monster);
    if (this.monster.isDead) {
      this.endBattle();
    }
  }

  public castIce(username: string) {
    const adventurer = this.getAdventurer(username);
    if (!adventurer) return;
    adventurer.castIce(this.monster);
    if (this.monster.isDead) {
      this.endBattle();
    }
  }

  public castLightning(username: string) {
    const adventurer = this.getAdventurer(username);
    if (!adventurer) return;
    adventurer.castLightning(this.monster);
    if (this.monster.isDead) {
      this.endBattle();
    }
  }

  // TODO extract parameter decorator
  public getAdventurer(username: string): Adventurer | undefined {
    return this.party.find(
      (a) => a.username.toLowerCase() === username.toLowerCase(),
    );
  }

  public hasJoined(username: string) {
    return !!this.getAdventurer(username);
  }

  public heal(healer: string, healed: string) {
    const healingAdventurer = this.getAdventurer(healer);
    const healedAdventurer = this.getAdventurer(healed);
    if (!healingAdventurer || !healedAdventurer) return;

    const healedHp = healingAdventurer.heal(healedAdventurer.username);
    if (!healedHp) return;
    healedAdventurer.receivesHeal(healedHp);
  }

  public castProtect(caster: string, target: string) {
    const casterAdventurer = this.getAdventurer(caster);
    const targetAdventurer = this.getAdventurer(target);
    if (!casterAdventurer || !targetAdventurer) return;

    const success = casterAdventurer.castProtect(targetAdventurer.username);
    if (success) targetAdventurer.receiveProtectCast();
  }

  public healParty(healer: string) {
    const healingAdventurer = this.getAdventurer(healer);
    if (!healingAdventurer) return;
    const healedHp = healingAdventurer.healParty(this.party.length);
    if (!healedHp) return;
    this.party.forEach((adventurer) => adventurer.receivesHeal(healedHp));
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

    // possibly start game loop
    if (this.party.length > 0 && !this.gameloop) {
      this.gameloop = global.setInterval(
        () => this.onTick(),
        this.timeTillAttackInSeconds * 1000,
      );
    }
  }
}
