import { ChakraProvider } from '@chakra-ui/react'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import { GameProvider } from './app/general/GameProvider'
import { SettingsProvider } from './app/general/SettingsContext'
import './global.css'
import { theme } from './theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <GameProvider>
          <SettingsProvider>
            <App />
          </SettingsProvider>
        </GameProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
)
