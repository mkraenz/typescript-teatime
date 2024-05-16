import { Citizens } from './citizens';

export class MaxWorkersExceededError extends Error {
  constructor() {
    super('MaxWorkersExceededError');
  }
}

export class LessThanZeroWorkersError extends Error {
  constructor() {
    super('LessThanZeroWorkersError');
  }
}

export class Workforce {
  maxWorkers: number;
  workers: number;
  private readonly citizens: Citizens;

  constructor(params: {
    citizens: Citizens;
    maxWorkers?: number;
    workers?: number;
  }) {
    this.citizens = params.citizens;
    this.maxWorkers = params.maxWorkers ?? 100;
    this.workers = params.workers ?? 0;
  }

  get productionFactor() {
    return this.workers / this.maxWorkers;
  }

  receiveWages(_amount: number) {
    // does nothing but nice for modeling the domain :)
  }

  addWorkers(count: number) {
    if (this.workers + count > this.maxWorkers) {
      throw new MaxWorkersExceededError();
    }
    this.workers += count;
  }

  removeWorkers(count: number) {
    if (this.workers - count < 0) {
      throw new LessThanZeroWorkersError();
    }
    this.workers -= count;
  }

  hire(count: number) {
    const workersNeeded = this.maxWorkers - this.workers;
    const workersToHire = Math.min(this.citizens.beggars, workersNeeded, count);
    this.addWorkers(workersToHire);
    this.citizens.hireWorkers(workersToHire);
  }

  fire(count: number) {
    const workersToFire = Math.min(this.workers, count);
    this.removeWorkers(workersToFire);
    this.citizens.fireWorkers(workersToFire);
  }
}
