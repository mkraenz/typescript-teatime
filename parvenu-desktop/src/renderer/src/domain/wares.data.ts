type Ware = {
  type: string;
  basePrice: number;
  civicConsumption: {
    poor: number;
    middle: number;
    rich: number;
  };
};

export const waresData: Record<string, Ware> = {
  beer: {
    type: 'beer',
    basePrice: 110,
    civicConsumption: {
      poor: 2,
      middle: 3,
      rich: 0.5,
    },
  },
  grain: {
    type: 'grain',
    basePrice: 80,
    civicConsumption: {
      poor: 3,
      middle: 5,
      rich: 0.5,
    },
  },
  wood: {
    type: 'wood',
    basePrice: 80,
    civicConsumption: {
      poor: 0,
      middle: 0,
      rich: 0,
    },
  },
  fabric: {
    type: 'fabric',
    basePrice: 110,
    civicConsumption: {
      poor: 0.2,
      middle: 1.8,
      rich: 0.7,
    },
  },
  furs: {
    type: 'furs',
    basePrice: 480,
    civicConsumption: {
      poor: 0.05,
      middle: 0.2,
      rich: 2,
    },
  },
  wine: {
    type: 'wine',
    basePrice: 480,
    civicConsumption: {
      poor: 0.05,
      middle: 0.3,
      rich: 3,
    },
  },
};
