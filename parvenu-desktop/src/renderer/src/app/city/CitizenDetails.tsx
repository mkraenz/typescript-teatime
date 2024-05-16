import { Heading, List, ListItem, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { City } from '../../domain/city';

export const CitizenDetails: FC<{ city: City }> = ({ city }) => {
  const citizens = city.citizens;
  return (
    <VStack align={'flex-start'}>
      <Heading as="h2">City {city.label} and its Citizens</Heading>
      <List>
        <ListItem>Beggars: {citizens.beggars}</ListItem>
        <ListItem>Poor: {citizens.poor}</ListItem>
        <ListItem>Middle: {citizens.middle}</ListItem>
        <ListItem>Rich: {citizens.rich}</ListItem>
        <ListItem>{city.treasury.balance} Gold</ListItem>
      </List>
    </VStack>
  );
};
