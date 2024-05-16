import { HStack, Heading, Radio, RadioGroup } from '@chakra-ui/react';
import { FC } from 'react';
import { useWorld } from '../general/GameProvider';
import useGamespeed from '../hooks/useGamespeed';

const SpeedSettings: FC = () => {
  const world = useWorld();
  const { gamespeed, setGamespeed } = useGamespeed();

  return (
    <HStack justify={'space-between'}>
      <Heading as="h2">
        Day {world.day} {world.isPayday && '(Payday)'}
      </Heading>
      <RadioGroup onChange={setGamespeed} value={gamespeed.toString()}>
        <HStack>
          <Radio value={'0'}>0x</Radio>
          <Radio value={'0.1'}>0.1x</Radio>
          <Radio value={'1'}>1x</Radio>
          <Radio value={'3'}>3x</Radio>
          <Radio value={'10'}>10x</Radio>
          <Radio value={'100'}>100x</Radio>
        </HStack>
      </RadioGroup>
    </HStack>
  );
};

export default SpeedSettings;
