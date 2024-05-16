import MyRouter from './general/Router';
import { useDisableContextMenu } from './hooks/useDisableContextMenu';
import useRenderLoop from './hooks/useGameLoop';

export const App = () => {
  useDisableContextMenu();
  useRenderLoop();
  return <MyRouter />;
};

export default App;
