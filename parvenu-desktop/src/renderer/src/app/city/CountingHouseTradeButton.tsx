import { IconButton, useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';
import { FiUserCheck } from 'react-icons/fi';
import { CountingHouse } from '../../domain/buildings/counting-house';
import { City } from '../../domain/city';
import { TradingPostOverlay } from './TradingPostOverlay';

export const CountingHouseTradeButton: FC<{
  city: City;
  building: CountingHouse;
}> = ({ city, building }) => {
  const tradingPostDialog = useDisclosure();
  return (
    <>
      <IconButton
        icon={<FiUserCheck />}
        aria-label="Open counting house trade menu"
        onClick={tradingPostDialog.onOpen}
      />

      <TradingPostOverlay
        city={city}
        merchant={building}
        visible={tradingPostDialog.isOpen}
        onClose={tradingPostDialog.onClose}
      />
    </>
  );
};
