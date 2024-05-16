import { IconButton } from '@chakra-ui/react';
import { FC } from 'react';
import { FiGlobe } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useEffectNavigateHomeOnEscape } from '../hooks/useEffectNavigateHomeOnEscape';

const ToWorldmapButton: FC = () => {
  useEffectNavigateHomeOnEscape();
  return (
    <IconButton aria-label="Open map" icon={<FiGlobe />} as={Link} to={'/'} />
  );
};

export default ToWorldmapButton;
