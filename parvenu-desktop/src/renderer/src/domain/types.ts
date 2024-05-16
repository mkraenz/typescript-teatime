export type Need = {
  ware: string;
  amount: number;
};

export type Product = {
  ware: string;
  /** amount of products produced per day */
  amount: number;
};

export type Point = {
  x: number;
  y: number;
};

type ConstructionCosts = {
  needs: Need[];
  money: number;
};

type BaseBuilding = {
  type: string;
  upkeepCost: number;
  constructionCosts: ConstructionCosts;
  unique?: 'per-city' | 'global' | 'per-merchant' | 'per-city-per-merchant';
};
type IServiceBuilding = {
  category: 'service';
  type: string;
} & BaseBuilding;

export type IProductionBuilding = {
  category: 'production';
  products: { ware: string; amount: number }[];
  needs: { ware: string; amount: number }[];
  wagesPerWorkerPerDay: number;
} & BaseBuilding;
export type IBuilding = IProductionBuilding | IServiceBuilding;

export type IShip = {
  type: string;
  upkeep: number;
  cargoCapacity: number;
  maxSpeed: number;
  constructionCosts: ConstructionCosts;
};
