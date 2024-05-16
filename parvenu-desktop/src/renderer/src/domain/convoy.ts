import { v4 } from 'uuid';
import { City } from './city';
import { Navigator } from './components/navigator';
import { Storage } from './storage';
import { Treasury } from './treasury';
import { Point } from './types';

type Ship = {
  upkeep: number;
  maxSpeed: number;
  cargoCapacity: number;
};

export class InvalidConvoyError extends Error {
  constructor(message: string, convoy: { id: string; label: string }) {
    super(`convoy id ${convoy.id}, label ${convoy.label}: ${message}`);
    this.name = 'InvalidConvoyError';
  }
}

export class Convoy {
  owner: string;
  id: string;
  label: string;
  pos: Point;
  readonly storage: Storage;
  readonly treasury: Treasury;
  ships: Ship[];
  target: { pos: Point } | null = null;
  navigator: Navigator;
  dockedAt: City | null = null;

  get upkeep() {
    return this.ships.reduce((acc, ship) => acc + ship.upkeep, 0);
  }

  /** 1 knot = 1,852 km per hour = 1 nautical mile per hour
   * @see http://www.shiptraffic.net/2001/05/sea-distances-calculator.html
   * cf. one-mast Cog (ger: Kogge) with good wind: 5 to 8 knots
   */
  get speedInKnots() {
    return Math.max(...this.ships.map((s) => s.maxSpeed));
  }

  get totalCargoCapacity() {
    return this.storage.totalCapacity;
  }

  get usedCargoCapacity() {
    return this.storage.usedCapacity;
  }

  constructor(params: {
    id?: string;
    owner: string;
    label: string;
    pos: Point;
    storage: Storage;
    treasury: Treasury;
    ships: Ship[];
    navigator: Navigator;
  }) {
    this.id = params.id ?? v4(); // Note: since we want to be independent of the environment (js vs node), we're not using window.crypto here.
    this.owner = params.owner;
    this.label = params.label;
    this.pos = params.pos;
    this.storage = params.storage;
    this.treasury = params.treasury;
    this.ships = params.ships;
    this.navigator = params.navigator;
    if (params.ships.length === 0) {
      throw new InvalidConvoyError('Convoy must have at least one ship', this);
    }

    this.updateStorageCapacity();
  }

  updateStorageCapacity() {
    const accumulatedCapacity = this.ships.reduce(
      (acc, ship) => acc + ship.cargoCapacity,
      0
    );
    this.storage.totalCapacity = accumulatedCapacity;
  }

  passTime(delta: number) {
    this.move(delta);
  }

  halt() {
    this.setPath(null);
    this.setTarget(null);
  }

  setTarget(target: { pos: Point } | null) {
    this.navigator.setTarget(target);
  }

  setPath(path: Point[] | null) {
    this.navigator.setPath(path);
  }

  move(delta: number) {
    this.navigator.move(delta);
  }

  dock(city: City) {
    city.port.dock(this);
    this.dockedAt = city;
  }

  undock() {
    if (this.dockedAt) {
      this.dockedAt.port.undock(this);
      this.dockedAt = null;
    }
  }
}
