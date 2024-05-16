import { IBuilding } from '../types';

export const buildingData: Record<string, IBuilding> = {
  countingHouse: {
    category: 'service',
    type: 'countingHouse',
    unique: 'per-city-per-merchant',
    upkeepCost: 50,
    constructionCosts: {
      needs: [{ ware: 'wood', amount: 20 }],
      money: 1500,
    },
  },
  shipyard: {
    category: 'service',
    type: 'shipyard',
    unique: 'per-city',
    upkeepCost: 0,
    constructionCosts: {
      needs: [{ ware: 'wood', amount: 20 }],
      money: 15000,
    },
  },
  brewery: {
    category: 'production',
    type: 'brewery',
    upkeepCost: 200,
    products: [{ ware: 'beer', amount: 8 }],
    needs: [{ ware: 'grain', amount: 1 }],
    wagesPerWorkerPerDay: 10,
    constructionCosts: {
      needs: [{ ware: 'wood', amount: 80 }],
      money: 1200,
    },
  },
  grainFarm: {
    category: 'production',
    type: 'grainFarm',
    upkeepCost: 50,
    products: [{ ware: 'grain', amount: 16 }],
    needs: [],
    wagesPerWorkerPerDay: 10,
    constructionCosts: {
      needs: [{ ware: 'wood', amount: 60 }],
      money: 1000,
    },
  },
  woodcutter: {
    category: 'production',
    type: 'woodcutter',
    upkeepCost: 50,
    products: [{ ware: 'wood', amount: 6 }],
    needs: [],
    wagesPerWorkerPerDay: 10,
    constructionCosts: {
      needs: [{ ware: 'wood', amount: 50 }],
      money: 1000,
    },
  },
};
