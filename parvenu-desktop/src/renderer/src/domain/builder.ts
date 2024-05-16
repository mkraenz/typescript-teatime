import { ConstructionManager } from './buildings/ConstructionManager';
import { CountingHouse } from './buildings/counting-house';
import { GrainFarm } from './buildings/grain-farm';
import { ProductionSystem } from './buildings/production.system';
import { Shipyard } from './buildings/shipyard';
import { WithProductionSystem } from './buildings/with-production-system.mixin';
import { Woodcutter } from './buildings/woodcutter';
import { Citizens } from './citizens';
import { City } from './city';
import { cityData } from './city.data';
import { Navigator } from './components/navigator';
import { Convoy } from './convoy';
import { FreightForwarder } from './freight-forwarder';
import { Player } from './player';
import { Port } from './port';
import { Ship } from './ship';
import { Storage } from './storage';
import { TradingPost } from './trading-post';
import { Treasury } from './treasury';
import { Point } from './types';
import { Workforce } from './workforce';
import { World } from './world';

const makeCity = (id: string, label: string, pos: Point, player: Player) => {
  const storage = new Storage(id);
  const citizens = new Citizens(storage);
  const treasury = new Treasury(id);
  const tradingPost = new TradingPost({
    citizens,
    cityStorage: storage,
    cityTreasury: treasury,
  });
  const city = new City({
    label,
    citizens,
    storage,
    tradingPost,
    buildings: {},
    treasury,
    port: new Port({
      owner: id,
    }),
    pos,
    id,
  });

  tradingPost.setMerchant(player);

  return {
    storage,
    citizens,
    treasury,
    tradingPost,
    city,
  };
};

export const builder = () => {
  const playerStorage = new Storage('player');
  // playerStorage.empty();
  const playerTreasury = new Treasury();
  playerTreasury.debit(10000);
  const player = new Player({
    storage: playerStorage,
    treasury: playerTreasury,
    name: 'player',
  });

  const cities = Object.values(cityData).map((data) =>
    makeCity(data.id, data.label, data.pos, player)
  );

  const hamburg = cities.find((city) => city.city.id === 'hamburg')!;
  hamburg.city.citizens.beggars = 200;

  const PWoodCutter = WithProductionSystem(Woodcutter);
  const PGrainFarm = WithProductionSystem(GrainFarm);
  const makeCityProductionSystem = () =>
    new ProductionSystem({
      cityTreasury: hamburg.city.treasury,
      storage: hamburg.city.storage,
      treasury: hamburg.city.treasury,
      workforce: new Workforce({
        citizens: hamburg.city.citizens,
        maxWorkers: 100,
        workers: 0,
      }),
      upkeepExempt: true,
    });
  const woodcutter = new PWoodCutter({
    owner: hamburg.city.id,
    productionSystem: makeCityProductionSystem(),
  });
  const farm = new PGrainFarm({
    owner: hamburg.city.id,
    productionSystem: makeCityProductionSystem(),
  });
  hamburg.city.build(woodcutter);
  hamburg.city.build(farm);

  const constructionManager = new ConstructionManager({
    city: hamburg.city,
  });
  const shipyard = new Shipyard({
    owner: hamburg.city.id,
    city: hamburg.city,
    constructionManager,
  });
  hamburg.city.build(shipyard);

  cities.forEach((city) => city.storage.debugFill());

  const countingHouse = new CountingHouse({
    storage: new Storage('counting house'),
    treasury: player.treasury,
    owner: player.name,
  });
  const ship = new Ship({
    owner: player.name,
    cargoCapacity: 51,
    upkeep: 150,
    maxSpeed: 5,
  });
  const navigator = new Navigator();
  const convoy = new Convoy({
    id: '5369d427-dfae-4231-b16c-60b611e3e34e', // fixing this in order for page reloads to stay on /convoys/:id
    owner: player.name,
    label: 'Antti',
    pos: { x: 100, y: 100 },
    storage: new Storage('Antti'),
    treasury: playerTreasury,
    ships: [ship],
    navigator,
  });
  navigator.setAgent(convoy);
  const convoys = [convoy];

  countingHouse.storage.debugFill();
  const freightForwarder = new FreightForwarder({
    targetStorage: countingHouse.storage,
    sourceStorage: convoy.storage,
  });
  freightForwarder.transferFrom('wood', 60);
  hamburg.city.build(countingHouse);

  const world = new World({
    player,
    cities: cities.reduce(
      (acc, city) => ({ ...acc, [city.city.id]: city.city }),
      {}
    ),
    convoys: convoys.reduce(
      (acc, convoy) => ({ ...acc, [convoy.id]: convoy }),
      {}
    ),
  });
  return {
    world,
  };
};
