import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useWorld } from './GameProvider';

type Settings = {
  gamespeed: number;
};

const defaultSettings: Settings = {
  gamespeed: 1,
};

const SettingsContext = createContext<{
  settings: Settings;
  setSettings: (settings: Settings) => void;
  delta: number;
  setGamespeed: (val: number) => void;
}>({
  settings: defaultSettings,
  setSettings: () => {},
  delta: 0,
  setGamespeed: () => {},
});

export const SettingsProvider: FC<PropsWithChildren<{ logicFps?: number }>> = ({
  children,
  logicFps = 60,
}) => {
  const world = useWorld();
  const [settings, setSettings] = useState(defaultSettings);

  const lastUpdateTime = useRef(Date.now());
  const lastDeltaApplied = useRef(0);
  const paused = useRef(false); //oof... decoupling the rendering from the game loop while allowing to modify gamespeed is rough
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    if (settings.gamespeed === 0) {
      lastUpdateTime.current = Date.now();
      return () => window.clearInterval(0);
    }
    const interval = window.setInterval(() => {
      const resuming = paused.current;
      if (resuming) {
        setDelta(0);
        lastUpdateTime.current = Date.now();
        paused.current = false;
      } else {
        setDelta((Date.now() - lastUpdateTime.current) * settings.gamespeed);
        lastUpdateTime.current = Date.now();
      }
    }, 1000 / logicFps);
    return () => window.clearInterval(interval);
  }, [settings.gamespeed, logicFps]);

  useEffect(() => {
    if (paused.current) return;
    const dayBeforeUpdate = world.day;
    world.passTime(delta);

    const nextDayBegan = !world.isToday(dayBeforeUpdate);
    if (nextDayBegan) {
      world.passDay();
    }
    lastDeltaApplied.current = lastUpdateTime.current;
  }, [delta, world]);

  const setGamespeed = useCallback(
    (val: number) => {
      setSettings((settings) => ({ ...settings, gamespeed: val }));
      if (settings.gamespeed === 0) paused.current = true;
    },
    [setSettings, settings.gamespeed]
  );
  return (
    <SettingsContext.Provider
      value={{ settings, setSettings, setGamespeed, delta }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
