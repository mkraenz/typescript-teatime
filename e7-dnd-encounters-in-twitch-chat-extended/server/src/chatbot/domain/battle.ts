import { random } from 'lodash';
import { clearInterval } from 'node:timers';
import { Adventurer } from '../../adventurer/adventurer.schema';
import { Monster } from './monster';
import { monsters } from './monsters.json';

const timeTillAttackInSeconds = 30;
export class Battle {
  private monster: Monster;
  private party: Adventurer[] = [];
  private gameloop: NodeJS.Timeout | null;

  constructor() {
    this.monster = this.getMonster();
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

  public get winner(): 'monster' | 'party' | null {
    if (this.monster.isDead) return 'party';
    const partyDown = this.party.every((adventurer) => adventurer.isDead);
    if (partyDown) return 'monster';
    return null;
  }

  public attack(adventurerUsername: string) {
    const adventurer = this.party.find(
      (adventurer) => adventurer.username === adventurerUsername,
    );
    if (!adventurer) return;
    adventurer.attack(this.monster);
  }

  private onTick() {
    if (this.monster.isDead) {
      clearInterval(this.gameloop!);
      this.gameloop = null;
    }

    const randomAdventurer = this.party[random(this.party.length - 1)];
    if (!randomAdventurer) {
      return;
    }
    this.monster.attack(randomAdventurer);
    this.party.forEach((adventurer) => adventurer.unblockAttack());

    // TODO persist data
  }

  private getMonster() {
    const data = { ...monsters[random(monsters.length - 1)] };
    return new Monster(data);
  }

  public join(adventurer: Adventurer) {
    this.party.push(adventurer);
  }
}
