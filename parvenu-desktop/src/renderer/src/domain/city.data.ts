import { Point } from './types';

type CityData = {
  id: string;
  label: string;
  pos: Point;
  beggars?: number;
};

export const cityData: { [cityName: string]: CityData } = {
  Hamburg: {
    id: 'hamburg',
    label: 'Hamburg',
    pos: { x: 237, y: 300 },
    beggars: 200,
  },
  Gdansk: {
    id: 'Gdansk',
    label: 'Gdansk',
    pos: { x: 407, y: 271 },
  },
  Stockholm: {
    id: 'Stockholm',
    label: 'Stockholm',
    pos: { x: 406, y: 55 },
  },
  Edinburgh: {
    id: 'Edinburgh',
    label: 'Edinburgh',
    pos: { x: 29, y: 128 },
  },
  London: {
    id: 'London',
    label: 'London',
    pos: { x: 45, y: 314 },
  },
  Aalborg: {
    id: 'Aalborg',
    label: 'Aalborg',
    pos: { x: 243, y: 150 },
  },
};
