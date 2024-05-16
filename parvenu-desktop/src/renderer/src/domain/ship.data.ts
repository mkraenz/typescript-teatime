import { IShip } from './types';

export const shipData: Record<string, IShip> = {
  sloop: {
    type: 'sloop',
    upkeep: 10,
    constructionCosts: {
      needs: [{ ware: 'wood', amount: 20 }],
      money: 1000,
    },
    cargoCapacity: 150,
    maxSpeed: 7,
  },
  frigate: {
    type: 'frigate',
    upkeep: 80,
    constructionCosts: {
      needs: [{ ware: 'wood', amount: 90 }],
      money: 4000,
    },
    cargoCapacity: 450,
    maxSpeed: 8,
  },
};
