import { City } from '../city';
import { Navigator } from '../components/navigator';
import { Convoy } from '../convoy';
import { Ship } from '../ship';
import { shipData } from '../ship.data';
import { Storage } from '../storage';
import { IShip } from '../types';
import {
  ConstructionManager,
  Merchant,
  assertMerchantDefined,
} from './ConstructionManager';
import { Building } from './building';

export class Shipyard extends Building {
  private readonly city: City;
  private merchant: Merchant | null = null;
  private constructionManager: ConstructionManager;

  constructor(params: {
    owner: string;
    city: City;
    constructionManager: ConstructionManager;
  }) {
    super({ type: 'shipyard', owner: params.owner });
    this.city = params.city;
    this.constructionManager = params.constructionManager;
  }

  setMerchant(merchant: Merchant) {
    this.merchant = merchant;
    this.constructionManager.setMerchant(merchant);
  }

  clearMerchant() {
    this.merchant = null;
    this.constructionManager.clearMerchant();
  }

  destroy() {
    // do nothing for now
  }

  buildShip(shipType: string, name: string) {
    const { merchant } = this;
    assertMerchantDefined(merchant);

    const data = shipData[shipType];
    if (this.constructionManager.canBuild(data)) {
      merchant.treasury.credit(data.constructionCosts.money);
      // construction costs get handed to the citizens, so not debiting the city treasury
      this.constructionManager.takeResources(data.constructionCosts.needs);
      const ship = this.makeShip(data);
      const convoy = this.makeConvoy(ship, name); // FUTURE: this should return a ship first, and then it can be turned into a convoy
      convoy.dock(this.city);
      return convoy;
    }
  }

  private makeConvoy(ship: Ship, name: string) {
    const { merchant } = this;
    assertMerchantDefined(merchant);

    const navigator = new Navigator();
    const convoy = new Convoy({
      owner: merchant.name,
      label: name,
      pos: this.city.pos,
      storage: new Storage(name),
      treasury: merchant.treasury,
      ships: [ship],
      navigator,
    });
    navigator.setAgent(convoy);
    return convoy;
  }

  private makeShip(data: IShip) {
    const { merchant } = this;
    assertMerchantDefined(merchant);

    const ship = new Ship({
      ...data,
      owner: merchant.name,
    });
    return ship;
  }

  canBuild(buildingType: string) {
    const data = shipData[buildingType];
    return this.constructionManager.canBuild(data);
  }
}

export function isShipyard(building: unknown): building is Shipyard {
  return (
    typeof building === 'object' &&
    building !== null &&
    'type' in building &&
    building.type === 'shipyard'
  );
}
