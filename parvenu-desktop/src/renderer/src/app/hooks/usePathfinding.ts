import { useCallback } from 'react';
import { Point } from '../../domain/types';
import { useGame } from '../general/GameProvider';

export const usePathfinding = () => {
  const [game] = useGame();
  const findPath = useCallback(
    (from: Point, to: Point) => game.navmesh.findPath(from, to),
    [game.navmesh]
  );
  return { findPath, navmesh: game.navmesh };
};
