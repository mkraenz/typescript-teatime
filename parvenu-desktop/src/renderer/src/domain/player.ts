import { Storage } from './storage';
import { Treasury } from './treasury';

export class Player {
  readonly name: string;
  readonly treasury: Treasury;
  readonly storage: Storage;

  constructor(params: { treasury: Treasury; storage: Storage; name: string }) {
    this.name = params.name;
    this.treasury = params.treasury;
    this.storage = params.storage;
  }
}
