import { NavMesh } from 'navmesh';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { builder } from '../../domain/builder';
import { City } from '../../domain/city';
import { Convoy } from '../../domain/convoy';
import { World } from '../../domain/world';
import navmeshPolygons from '../navmesh-polygons.json';

type Game = {
  world: World;
  navmesh: NavMesh;
};

const GameContext = createContext<[Game, (game: Game) => void]>([
  // @ts-expect-error -- no need to mess with the default
  null,
  () => {},
]);

export const GameProvider: FC<PropsWithChildren> = ({ children }) => {
  const [game, setGame] = useState({
    ...builder(),
    navmesh: new NavMesh(navmeshPolygons), // FIXME: do we need to call remove() to clean up to avoid memory leaks?
  });

  useEffect(() => {
    // for easier debugging
    (window as any).game = game;
  }, []);

  return (
    <GameContext.Provider value={[game, setGame]}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
export const useWorld = () => useGame()[0].world;
export const useConvoy = (id: string | undefined) =>
  (useWorld().convoys[id ?? ''] || null) as Convoy | null;
export const useCity = (id: string | undefined) =>
  useWorld().cities[id ?? ''] as City | null;
