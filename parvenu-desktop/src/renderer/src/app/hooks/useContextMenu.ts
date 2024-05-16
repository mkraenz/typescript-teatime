import { MouseEventHandler, useCallback } from 'react';

export const useContextMenu = (callback: () => void) => {
  return useCallback<MouseEventHandler>(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      callback();
    },
    [callback]
  );
};
