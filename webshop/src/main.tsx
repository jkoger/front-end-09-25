import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import { CartSumContextProvider } from './context/CartSumContextProvider.js';
import { AuthContextProvider } from './context/AuthContextProvider.js';
import { Provider } from 'react-redux';
import {store} from './store/store.ts';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     <CartSumContextProvider>
      <AuthContextProvider>
        <Provider store ={store}>
     <App />
     </Provider>
     </AuthContextProvider>
     </CartSumContextProvider>
    
    </BrowserRouter>
  </StrictMode>,
)
