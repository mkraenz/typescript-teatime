import { Storage } from './storage';
import { waresData } from './wares.data';

export class Citizens {
  beggars = 0;
  poor = 600;
  middle = 350;
  rich = 50;

  constructor(private storage: Storage) {}

  get total() {
    return this.poor + this.middle + this.rich;
  }

  getResourceConsumption(ware: string) {
    const factorsByPopulationType = waresData[ware].civicConsumption;
    const theoreticalConsumption =
      (this.poor * factorsByPopulationType.poor +
        this.middle * factorsByPopulationType.middle +
        this.rich * factorsByPopulationType.rich) /
      1000.0;
    return Math.ceil(theoreticalConsumption); // ceiling so that consumption >= 1
  }

  consumeResource(ware: string) {
    const consumption = this.getResourceConsumption(ware);
    this.storage.remove(ware, consumption);
  }

  consumeResources() {
    this.storage.waresList.forEach((ware) => this.consumeResource(ware.type));
  }

  hireWorkers(workers: number) {
    this.beggars -= workers;
    this.poor += workers;
  }

  fireWorkers(workersToFire: number) {
    this.poor -= workersToFire;
    this.beggars += workersToFire;
  }

  addMigrants(count: number) {
    this.beggars += count;
  }
}
