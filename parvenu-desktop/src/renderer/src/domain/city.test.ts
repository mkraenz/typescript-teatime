import { GrainFarm } from './buildings/grain-farm';
import { Citizens } from './citizens';
import { City } from './city';
import { Storage } from './storage';
import { Treasury } from './treasury';
import { Workforce } from './workforce';

it('produces grain in a city with a fully occupied grain farm', () => {
  const storage = new Storage();
  storage.empty();
  const citizens = new Citizens(storage);
  const workforce = new Workforce({
    citizens,
    workers: 100,
    maxWorkers: 100,
  });
  const cityTreasury = new Treasury();
  const treasury = new Treasury();
  const grainFarm = new GrainFarm({
    owner: 'me',
    storage,
    workforce,
    treasury,
    cityTreasury,
  });
  const city = new City({
    citizens,
    storage,
    buildings: { [grainFarm.id]: grainFarm },
    treasury,
  });

  city.produce();

  expect(storage.wares['grain']).toBe(16);
});
