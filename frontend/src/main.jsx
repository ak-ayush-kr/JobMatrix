import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux';
import {persistStore} from "redux-persist";
import {PersistGate} from 'redux-persist/integration/react';
import store from "./redux/store.js"
import './index.css'
import App from './App.jsx'

const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
