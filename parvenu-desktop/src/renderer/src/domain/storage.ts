import { Need } from './types';

const initialWares: Record<string, number> = {
  beer: 0,
  fabric: 0,
  furs: 0,
  grain: 0,
  wine: 0,
  wood: 0,
};

export class Storage {
  readonly owner: string;
  /** IMPORTANT: The amount of wares can be floating point numbers. But whenever we show it to the user, we typically display integers for simplicity. */
  wares = { ...initialWares };
  totalCapacity: number;

  constructor(owner = '', totalCapacity = Infinity) {
    this.owner = owner;
    this.totalCapacity = totalCapacity;
  }

  get waresList() {
    return Object.entries(this.wares).map(([ware, amount]) => ({
      type: ware,
      amount,
    }));
  }

  get usedCapacity() {
    return Object.keys(this.wares).reduce(
      (acc, ware) => acc + this.getStock(ware),
      0
    );
  }

  get remainingCapacity() {
    return this.totalCapacity - this.usedCapacity;
  }

  getStock(ware: string) {
    // flooring bodes trouble in the future. we'll see
    return Math.floor(this.wares[ware]);
  }

  empty() {
    Object.keys(this.wares).forEach((ware) => {
      this.wares[ware] = 0;
    });
  }

  add(ware: string, amount: number) {
    this.wares[ware] += amount;
    this.wares[ware] = Math.max(this.wares[ware], 0);
  }

  remove(ware: string, amount: number) {
    this.wares[ware] -= amount;
    this.wares[ware] = Math.max(this.wares[ware], 0);
  }

  hasResources(needs: Need[]) {
    return needs.every((need) => this.wares[need.ware] >= need.amount);
  }

  hasCapacity(resource: Need[]) {
    const additionallyNeededCapacity = resource.reduce(
      (acc, { amount }) => acc + amount,
      0
    );
    return this.remainingCapacity >= additionallyNeededCapacity;
  }

  log() {
    console.log(this.wares);
  }

  consume(needs: Need[]) {
    needs.forEach((need) => this.remove(need.ware, need.amount));
  }

  getAsAvailable(needs: Need[]) {
    return needs.map((need) => {
      const available = this.getStock(need.ware);
      const amount = Math.min(need.amount, available);
      return { ware: need.ware, amount };
    });
  }

  debugFill() {
    Object.keys(this.wares).forEach((ware) => {
      this.wares[ware] = 60;
    });
  }
}
