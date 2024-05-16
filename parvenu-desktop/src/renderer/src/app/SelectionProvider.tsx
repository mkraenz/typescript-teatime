import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Convoy } from '../domain/convoy';
import { useConvoy } from './general/GameProvider';

const SelectionContext = createContext<{
  /** id of the selected convoy */
  selected: string;
  setSelected: (id: string) => void;
  setSelectedWithNavEffect: (id: string) => void;
  selectedConvoy: Convoy | null;
}>({
  selected: '',
  setSelected: () => {},
  setSelectedWithNavEffect: () => {},
  selectedConvoy: null,
});

export const SelectionProvider: FC<
  PropsWithChildren<{ logicFps?: number }>
> = ({ children }) => {
  const nav = useNavigate();
  const [selected, setSelected] = useState('');
  const convoy = useConvoy(selected);
  const [selectionTime, setSelectionTime] = useState(0);

  const setSelectedWithNavEffect = useCallback(
    (val: string) => {
      setSelected(val);
      const isDoubleClick = selectionTime > Date.now() - 300;
      if (isDoubleClick) {
        nav(`/convoys/${val}`);
      }
      setSelectionTime(Date.now());
    },
    [selectionTime, nav]
  );

  return (
    <SelectionContext.Provider
      value={{
        selected,
        setSelected,
        setSelectedWithNavEffect,
        selectedConvoy: convoy,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useConvoySelector = () => useContext(SelectionContext);
