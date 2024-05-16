import { Convoy } from './convoy';
import { Ship } from './ship';

export class Port {
  readonly owner: string;
  convoys: Record<string, Convoy> = {};
  unassignedShips: Record<string, Ship> = {};

  constructor(params: {
    owner: string;
    convoys?: Record<string, Convoy>;
    freeShips?: Record<string, Ship>;
  }) {
    this.owner = params.owner;
    this.convoys = params.convoys ?? {};
    this.unassignedShips = params.freeShips ?? {};
  }

  dock(convoy: Convoy) {
    if (this.convoys[convoy.id]) return;
    this.convoys[convoy.id] = convoy;
  }

  undock(convoy: Convoy) {
    delete this.convoys[convoy.id];
  }

  toJSON() {
    return {
      owner: this.owner,
      convoys: this.convoys,
      unassignedShips: this.unassignedShips,
    };
  }
}
