import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import Theme from "./themes/Theme.jsx";
import { BrowserRouter } from 'react-router-dom'

// import { extendTheme } from '@chakra-ui/react'

// const config = {
//   initialColorMode: 'light',
//   useSystemColorMode: false,
// }
// const theme = extendTheme({ config })


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={Theme}>
          <App />
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
