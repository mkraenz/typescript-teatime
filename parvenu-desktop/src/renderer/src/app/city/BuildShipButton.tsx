import { IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { FaHammer } from 'react-icons/fa';
import { Shipyard } from '../../domain/buildings/shipyard';
import { City } from '../../domain/city';
import { Player } from '../../domain/player';
import { useWorld } from '../general/GameProvider';

export const BuildShipButton: FC<{
  building: Shipyard;
  city: City;
  player: Player;
}> = ({ building, player }) => {
  const world = useWorld();
  const buildShip = () => {
    building.setMerchant(player);
    const convoy = building.buildShip('sloop', 'My Super Sloop');
    building.clearMerchant();
    if (!convoy) return;
    world.addConvoy(convoy);
  };
  return (
    <>
      <IconButton
        icon={<FaHammer />}
        aria-label="Open counting house trade menu"
        onClick={buildShip}
      />
    </>
  );
};
