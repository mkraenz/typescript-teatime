import { Building } from './buildings/building';
import type { CountingHouse } from './buildings/counting-house';
import { Citizens } from './citizens';
import { Port } from './port';
import { Storage } from './storage';
import { TradingPost } from './trading-post';
import { Treasury } from './treasury';
import { Point } from './types';

export class City {
  readonly id: string;
  readonly label: string;
  readonly citizens: Citizens;
  readonly buildings: Record<string, Building>;
  readonly storage: Storage;
  readonly treasury: Treasury;
  readonly tradingPost: TradingPost;
  readonly pos: Point;
  readonly port: Port;

  get buildingsList() {
    return Object.values(this.buildings);
  }

  constructor(params: {
    citizens: Citizens;
    buildings: Record<string, Building>;
    storage: Storage;
    treasury: Treasury;
    tradingPost: TradingPost;
    port: Port;
    label: string;
    pos: Point;
    id: string;
  }) {
    this.id = params.id;
    this.citizens = params.citizens;
    this.buildings = params.buildings;
    this.storage = params.storage;
    this.treasury = params.treasury;
    this.tradingPost = params.tradingPost;
    this.port = params.port;
    this.id = params.id;
    this.pos = params.pos;
    this.label = params.label;
  }

  passDay(currentDay: number) {
    this.receiveMigrants(1); // FUTURE should be a function of the city's prosperity / wealth / citizens happiness
    this.employMigrants();
    this.produce();
    this.consumeAllResources();
    const weekPassed = currentDay % 7 === 0;
    if (weekPassed) {
      this.collectUpkeep();
    }
  }

  consumeResource(ware: string) {
    this.citizens.consumeResource(ware);
  }

  consumeAllResources() {
    this.citizens.consumeResources();
  }

  produce() {
    Object.values(this.buildings).forEach((building) => {
      if ('produce' in building && typeof building.produce === 'function') {
        building.produce();
      }
    });
  }

  collectUpkeep() {
    Object.values(this.buildings).forEach((building) => {
      if ('payUpkeep' in building && typeof building.payUpkeep === 'function') {
        building.payUpkeep();
      }
    });
  }

  getCountingHouse(owner: string) {
    return this.buildingsList.find(
      (building) =>
        building.type === 'countingHouse' && building.owner === owner
    ) as CountingHouse | undefined;
  }

  employMigrants() {
    this.buildingsList.forEach((building) => {
      if (
        'hireWorkers' in building &&
        typeof building.hireWorkers === 'function'
      ) {
        building.hireWorkers();
      }
    });
  }

  build(building: Building) {
    this.buildings[building.id] = building;
  }

  destroyBuilding(buildingId: string) {
    const building = this.buildings[buildingId];
    building.destroy();
    delete this.buildings[building.id];
  }

  receiveMigrants(count: number) {
    this.citizens.addMigrants(count);
  }
}
