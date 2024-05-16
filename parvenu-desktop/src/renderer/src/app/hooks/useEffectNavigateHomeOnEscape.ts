import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useEffectNavigateHomeOnEscape = () => {
  const nav = useNavigate();
  useEffect(() => {
    const navToHomeOnEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') nav('/');
    };
    window.addEventListener('keydown', navToHomeOnEsc);
    return () => window.removeEventListener('keydown', navToHomeOnEsc);
  }, [nav]);
};
