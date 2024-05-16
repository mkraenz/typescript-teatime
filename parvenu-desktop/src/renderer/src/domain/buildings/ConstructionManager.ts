import { assert } from '../../utils/utils';
import { City } from '../city';
import type { Treasury } from '../treasury';
import { IBuilding, IShip, Need } from '../types';
import type { CountingHouse } from './counting-house';

export type Merchant = {
  treasury: Treasury;
  name: string;
};

const subtractNeedsOrZero = (baseNeeds: Need[], subtractedNeeds: Need[]) => {
  // WARNING: assumes that both arrays are in the same order
  return baseNeeds.map((need, index) => {
    assert(need.ware === subtractedNeeds[index].ware, 'Ware mismatch');
    return {
      ...need,
      amount: Math.max(need.amount - subtractedNeeds[index].amount, 0),
    };
  });
};

export function assertMerchantDefined(
  merchant: Merchant | null
): asserts merchant is Merchant {
  if (!merchant) throw new Error('Merchant must be set on the shipyard');
}

export class ConstructionManager {
  private readonly city: City;
  private merchant: Merchant | null = null;

  setMerchant(merchant: Merchant) {
    this.merchant = merchant;
  }

  clearMerchant() {
    this.merchant = null;
  }

  constructor(params: { city: City }) {
    this.city = params.city;
  }

  canBuild(data: IShip | IBuilding) {
    const merchant = this.merchant;
    assertMerchantDefined(merchant);

    if (!merchant.treasury.hasEnough(data.constructionCosts.money))
      return false;

    const convoys = this.city.port.convoys;
    const playerOwnedConvoys = Object.values(convoys).filter(
      (convoy) => convoy.owner === merchant.name
    );
    const needs = data.constructionCosts.needs;
    const countingHouse = this.city.buildingsList.filter(
      (building) =>
        building.type === 'countingHouse' && building.owner === merchant.name
    )[0] as CountingHouse | undefined;

    const resourcesInCountingHouse =
      countingHouse?.storage.getAsAvailable(needs);
    let remainingNeeds = resourcesInCountingHouse
      ? subtractNeedsOrZero(needs, resourcesInCountingHouse)
      : needs;
    for (const convoy of playerOwnedConvoys) {
      const resourcesInConvoy = convoy.storage.getAsAvailable(remainingNeeds);
      remainingNeeds = subtractNeedsOrZero(remainingNeeds, resourcesInConvoy);
    }
    const allResourceNeedsFulfilled = remainingNeeds.every(
      (need) => need.amount === 0
    );
    return allResourceNeedsFulfilled;
  }

  takeResources(needs: Need[]) {
    const { merchant } = this;
    assertMerchantDefined(merchant);

    const convoys = this.city.port.convoys;
    const playerOwned = Object.values(convoys).filter(
      (convoy) => convoy.owner === merchant.name
    );
    const countingHouse = this.city.getCountingHouse(merchant.name);

    const resourcesInCountingHouse =
      countingHouse?.storage.getAsAvailable(needs);
    if (resourcesInCountingHouse)
      countingHouse?.storage.consume(resourcesInCountingHouse);
    let remainingNeeds = resourcesInCountingHouse
      ? subtractNeedsOrZero(needs, resourcesInCountingHouse)
      : needs;
    for (const convoy of playerOwned) {
      const resourcesInConvoy = convoy.storage.getAsAvailable(remainingNeeds);
      convoy.storage.consume(resourcesInConvoy);
      remainingNeeds = subtractNeedsOrZero(remainingNeeds, resourcesInConvoy);
    }
  }
}
