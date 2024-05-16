import { useNavigate } from 'react-router-dom';
import { useContextMenu } from './useContextMenu';

export const useNavigateBack = () => {
  const nav = useNavigate();
  return useContextMenu(() => nav(-1));
};
