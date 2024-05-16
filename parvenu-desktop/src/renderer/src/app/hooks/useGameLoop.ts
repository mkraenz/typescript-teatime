import { useEffect, useState } from 'react';

const useRenderLoop = (fps = 30) => {
  const [_, forceRerender] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => {
      forceRerender((frames) => frames + 1);
    }, 1000 / fps);
    return () => window.clearInterval(interval);
  }, [fps]);
};

export default useRenderLoop;
