import { Box } from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';
import { useNavigateBack } from '../hooks/useNavigateBack';

const DetailsPage: FC<PropsWithChildren> = ({ children }) => {
  const navBack = useNavigateBack();

  return (
    <Box onContextMenu={navBack} h={'98vh'}>
      {children}
    </Box>
  );
};

export default DetailsPage;
