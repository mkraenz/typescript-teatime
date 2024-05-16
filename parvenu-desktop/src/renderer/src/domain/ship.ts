import { v4 } from 'uuid';

export class Ship {
  readonly id: string;
  owner: string;
  cargoCapacity: number;
  upkeep: number;
  maxSpeed: number;

  constructor(params: {
    id?: string;
    owner: string;
    cargoCapacity: number;
    upkeep: number;
    maxSpeed: number;
  }) {
    this.owner = params.owner;
    this.cargoCapacity = params.cargoCapacity;
    this.id = params.id ?? v4();
    this.upkeep = params.upkeep;
    this.maxSpeed = params.maxSpeed;
  }

  toJSON() {
    return {
      id: this.id,
      owner: this.owner,
      cargoCapacity: this.cargoCapacity,
    };
  }
}
