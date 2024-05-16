import {
  Heading,
  List,
  ListItem,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { FC, useState } from 'react';
import { City } from '../../domain/city';
import { Convoy } from '../../domain/convoy';
import { TradingPostOverlay } from './TradingPostOverlay';

export const Port: FC<{ city: City }> = ({ city }) => {
  const hoverColor = useColorModeValue('gray.300', 'gray.700');
  const [selected, setSelected] = useState<Convoy | null>(null);
  const tradingPostDialog = useDisclosure();
  return (
    <VStack align={'flex-start'}>
      <Heading as="h2">Port</Heading>
      <List width={'100%'}>
        {isEmpty(city.port.convoys) && <ListItem>No convoys docked.</ListItem>}
        {Object.values(city.port.convoys).map((convoy) => (
          <ListItem
            key={convoy.id}
            cursor={'pointer'}
            onClick={() => {
              setSelected(convoy);
              tradingPostDialog.onOpen();
            }}
            _hover={{ backgroundColor: hoverColor }}
          >
            {convoy.label} - {convoy.usedCargoCapacity}
            {' / '}
            {convoy.totalCargoCapacity} cargo
          </ListItem>
        ))}
      </List>
      {selected && (
        <TradingPostOverlay
          city={city}
          merchant={selected}
          visible={tradingPostDialog.isOpen}
          onClose={tradingPostDialog.onClose}
        />
      )}
    </VStack>
  );
};
