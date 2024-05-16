import { IProductionBuilding } from '../types';
import { Building } from './building';
import { buildingData } from './building.data';
import { ProductionSystem } from './production.system';

export class Brewery extends Building {
  readonly productionSystem: ProductionSystem;

  constructor(params: { owner: string; productionSystem: ProductionSystem }) {
    super({
      owner: params.owner,
      type: buildingData.brewery.type,
    });
    this.productionSystem = params.productionSystem;

    this.productionSystem.init(buildingData.brewery as IProductionBuilding);
  }

  save() {
    return {
      type: this.type,
      idNumber: this.idNumber,
      owner: this.owner,
    };
  }

  destroy() {
    this.productionSystem.destroy();
  }
}
