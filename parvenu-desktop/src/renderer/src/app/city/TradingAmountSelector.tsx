import { HStack, Radio, RadioGroup } from '@chakra-ui/react';
import { toInteger } from 'lodash';
import { FC } from 'react';

export const TradingAmountSelector: FC<{
  setAmountTraded: (n: number) => void;
  amountTraded: number;
}> = ({ amountTraded, setAmountTraded }) => {
  return (
    <RadioGroup
      onChange={(n) => setAmountTraded(toInteger(n))}
      value={amountTraded.toString()}
    >
      <HStack>
        <Radio value={'1'}>1</Radio>
        <Radio value={'5'}>5</Radio>
        <Radio value={'50'}>50</Radio>
      </HStack>
    </RadioGroup>
  );
};
