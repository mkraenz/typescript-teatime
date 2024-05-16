import { Building } from './building';

export class House extends Building {
  population = 50;
  maxPopulation = 100;

  constructor(params: { owner: string }) {
    super({
      owner: params.owner,
      type: 'house',
    });
  }

  destroy(): void {}
}
