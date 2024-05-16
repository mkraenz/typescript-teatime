import { Circle, Square } from '@chakra-ui/react';
import { NavMesh } from 'navmesh';
import { FC, useMemo, useState } from 'react';
import navmeshMatrix from './navmesh-matrix.json';
import navmeshPolygons from './navmesh-polygons.json';

type Props = {};

const Rect: FC<{
  walkable: boolean;
  tilesize: number;
  isOnPath?: boolean;
  onClick: VoidFunction;
  onContextMenu: VoidFunction;
}> = ({ walkable, tilesize, isOnPath, onClick, onContextMenu }) => {
  return (
    <Square
      size={tilesize}
      borderStyle={'solid'}
      backgroundColor={isOnPath ? 'green' : walkable ? 'blue' : 'black'}
      onClick={onClick}
      onContextMenu={onContextMenu}
    />
  );
};

const PathFindingTest: FC<Props> = (props) => {
  /** value of 1 in the matrix means walkable */
  const map = navmeshMatrix;
  const tilesize = 1;
  const [from, setFrom] = useState({ x: 20, y: 5 });
  const [to, setTo] = useState({ x: 150 * tilesize, y: 110 * tilesize });
  console.log(to);
  const path = useMemo(() => {
    // const polys = buildPolysFromGridMap(map, tilesize, tilesize); // the tile size is how small the smallest rectangle is.
    const polys = navmeshPolygons;
    const navMesh = new NavMesh(polys);
    const path = navMesh.findPath(from, to);
    console.log(
      'path',
      path?.map((p) => `${p.x} ${p.y}`)
    );
    return path;
  }, [from, to]);

  const downscaledPath = useMemo(
    () =>
      path?.map((p) => ({
        x: p.x / tilesize,
        y: p.y / tilesize,
      })),
    [path]
  );

  return (
    <div>
      {map.map((row, y) => {
        return (
          <div key={y} style={{ display: 'flex' }}>
            {row.map((col, x) => {
              if (y > 120 || x > 180) return null;
              return (
                <Rect
                  key={x}
                  walkable={col === 1}
                  tilesize={tilesize}
                  isOnPath={downscaledPath?.some((p) => p.x === x && p.y === y)}
                  onClick={() => {
                    console.log('clicked', x, y);
                    setTo({ x: x * tilesize, y: y * tilesize });
                  }}
                  onContextMenu={() => {
                    console.log('right clicked', x, y);
                    setFrom({ x: x * tilesize, y: y * tilesize });
                  }}
                />
              );
            })}
          </div>
        );
      })}
      {path &&
        path.map((p) => (
          <Circle
            position={'absolute'}
            backgroundColor={'blue'}
            top={p.y}
            left={p.x}
            size={3}
            key={`${p.x}-${p.y}`}
          />
        ))}
    </div>
  );
};

export default PathFindingTest;
