import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import { FC, MouseEventHandler } from 'react';
import { MdSailing } from 'react-icons/md';
import { useConvoySelector } from '../SelectionProvider';
import { useConvoy } from '../general/GameProvider';
import { useContextMenu } from '../hooks/useContextMenu';

type Props = {
  id: string;
};

const Convoy: FC<Props> = ({ id }) => {
  const convoy = useConvoy(id);
  const selector = useConvoySelector();
  const handleSelect = useContextMenu(() => {
    if (convoy) selector.setSelectedWithNavEffect(convoy.id);
  });

  if (!convoy) return null;
  return (
    <Box
      // HACK: using inline styles to bypass chakra trying to create styles in the html head which seems to cause laggy animation. Though sometimes it's still laggy with this approach.
      style={{
        top: `${convoy.pos.y}px`,
        left: `${convoy.pos.x}px`,
        position: 'absolute',
      }}
    >
      <Tooltip
        label={`${convoy.label} - ${convoy.usedCargoCapacity}/${convoy.totalCargoCapacity}`}
      >
        <IconButton
          variant={'outline'}
          position={'relative'}
          left={'-50%'}
          top={'-21px'}
          onClick={handleSelect}
          icon={<MdSailing />}
          aria-label={convoy.label}
          isActive={selector.selected === id}
          backgroundColor={'transparent'}
        />
      </Tooltip>
    </Box>
  );
};

export default Convoy;
