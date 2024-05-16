import { City } from './city';
import { Convoy } from './convoy';
import { Player } from './player';

export class World {
  cities: Record<string, City>;
  convoys: Record<string, Convoy>;
  // actor names need to be unique because that's how ownership of buildings etc is determined
  player: Player;
  /** one second outgame is one day ingame. */
  totaltime = 0;

  private convoyListCache: Convoy[] = [];
  private cityListCache: City[] = [];

  get day() {
    return Math.floor(this.totaltime / 1000);
  }

  get isPayday() {
    return this.day !== 0 && this.day % 7 === 0;
  }

  get citiesList() {
    return this.cityListCache;
  }

  get convoysList() {
    return this.convoyListCache;
  }

  constructor(params: {
    cities: Record<string, City>;
    player: Player;
    convoys: Record<string, Convoy>;
  }) {
    this.cities = params.cities;
    this.player = params.player;
    this.convoys = params.convoys;
    this.updateCache();
  }

  private updateCache() {
    this.convoyListCache = Object.values(this.convoys);
    this.cityListCache = Object.values(this.cities);
  }

  passDay() {
    this.citiesList.forEach((city) => city.passDay(this.day));
  }

  passTime(delta: number) {
    if (delta === 0) return;
    this.totaltime += delta;
    this.convoysList.forEach((convoy) => convoy.passTime(delta));
  }

  isToday(day: number) {
    return this.day === day;
  }

  addConvoy(convoy: Convoy) {
    this.convoys[convoy.id] = convoy;
    this.updateCache();
  }
}
