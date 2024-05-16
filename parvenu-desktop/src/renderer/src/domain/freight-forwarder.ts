import { Storage } from './storage';

export class NotEnoughResourcesError extends Error {
  constructor() {
    super('NotEnoughResources');
  }
}

/** @see https://en.wikipedia.org/wiki/Freight_forwarder */
export class FreightForwarder {
  private readonly targetStorage: Storage;
  private readonly sourceStorage: Storage;

  constructor(params: { targetStorage: Storage; sourceStorage: Storage }) {
    this.targetStorage = params.targetStorage;
    this.sourceStorage = params.sourceStorage;
  }

  canTransferInto(ware: string, amount: number) {
    return this.sourceStorage.hasResources([{ amount, ware }]);
  }

  transferInto(ware: string, amount: number) {
    if (!this.canTransferInto(ware, amount))
      throw new NotEnoughResourcesError();
    this.sourceStorage.remove(ware, amount);
    this.targetStorage.add(ware, amount);
  }

  transferFrom(ware: string, amount: number) {
    if (!this.canTransferFrom(ware, amount))
      throw new NotEnoughResourcesError();
    this.sourceStorage.add(ware, amount);
    this.targetStorage.remove(ware, amount);
  }

  canTransferFrom(ware: string, amount: number) {
    return this.targetStorage.hasResources([{ amount, ware }]);
  }
}
