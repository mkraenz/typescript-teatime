import { useCallback, useEffect } from 'react';
import { useSettings } from '../general/SettingsContext';

const handleKeyPress =
  (setSpeed: (value: number) => void) => (event: KeyboardEvent) => {
    if (event.key === ' ') setSpeed(0); // space bar
    if (event.key === '1') setSpeed(0.1);
    if (event.key === '2') setSpeed(1);
    if (event.key === '3') setSpeed(3);
    if (event.key === '4') setSpeed(10);
    if (event.key === '5') setSpeed(100);
  };

const useGamespeed = () => {
  const { setGamespeed, settings } = useSettings();

  useEffect(() => {
    const listener = handleKeyPress((val) => setGamespeed(val));
    window.addEventListener('keydown', listener, false);
    return () => document.removeEventListener('keydown', listener);
  }, [setGamespeed]);
  const setGameSpeedPolymorph = useCallback(
    (value: number | string) =>
      setGamespeed(typeof value === 'number' ? value : parseFloat(value)),
    [setGamespeed]
  );

  return {
    gamespeed: settings.gamespeed,
    setGamespeed: setGameSpeedPolymorph,
  };
};

export default useGamespeed;
