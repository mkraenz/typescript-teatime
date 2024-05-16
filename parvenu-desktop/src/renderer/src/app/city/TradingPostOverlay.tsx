import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import {
  CountingHouse,
  isCountingHouse,
} from '../../domain/buildings/counting-house';
import { City } from '../../domain/city';
import { Convoy } from '../../domain/convoy';
import { TradingPostTable } from './TradingPostTable';
import { TradingAmountSelector } from './TradingAmountSelector';
import { useContextMenu } from '../hooks/useContextMenu';

export const TradingPostOverlay: FC<{
  city: City;
  merchant: Convoy | CountingHouse;
  visible: boolean;
  onClose: VoidFunction;
}> = ({ visible, onClose, city, merchant }) => {
  const [amountTraded, setAmountTraded] = useState(1);
  const closeOnContextMenu = useContextMenu(onClose);
  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth={'95%'} onContextMenu={closeOnContextMenu}>
        <ModalHeader>
          {isCountingHouse(merchant) ? (
            <Text>
              {city.label} {city.storage.usedCapacity}
              {' <> '}
              {merchant.owner}'s Counting House {merchant.storage.usedCapacity}
            </Text>
          ) : (
            <Text>
              {city.label} {city.storage.usedCapacity}
              {' <> '}
              {merchant.label} {merchant.usedCargoCapacity}
              {' / '}
              {merchant.totalCargoCapacity}
            </Text>
          )}
          <VStack>
            <TradingAmountSelector
              amountTraded={amountTraded}
              setAmountTraded={setAmountTraded}
            />
          </VStack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TradingPostTable
            city={city}
            merchant={merchant}
            amountTraded={amountTraded}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
