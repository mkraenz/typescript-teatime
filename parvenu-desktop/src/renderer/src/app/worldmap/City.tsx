import { Button, Text, Tooltip, VStack } from '@chakra-ui/react';
import { FC, MouseEventHandler } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCity } from '../general/GameProvider';

type Props = {
  id: string;
  onContextMenu: MouseEventHandler<HTMLButtonElement>;
};

const City: FC<Props> = ({ id, onContextMenu }) => {
  const city = useCity(id);
  if (!city) return <Navigate to="/" />;
  return (
    <VStack
      pos={'absolute'}
      // forcing px bc if we use numbers below 10 direcly, chakra will convert them to the --chakra-sizes-<number> css variable instead
      top={`${city.pos.y}px`}
      left={`${city.pos.x}px`}
      gap={0}
    >
      <Tooltip label={city.label}>
        <Button
          position={'relative'}
          left={'-50%'}
          top={'-50%'}
          aria-label={city.label}
          as={Link}
          to={`/cities/${city.id}`}
          onContextMenu={onContextMenu}
          borderRadius={'50%'}
          borderWidth={1}
          h={2.5}
          w={2.5}
          minW={2.5}
          p={0}
        />
      </Tooltip>
    </VStack>
  );
};

export default City;
