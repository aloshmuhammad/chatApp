import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store,persistor } from './Redux/Store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { UserContextProvider } from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <UserContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </UserContextProvider>
  </PersistGate>

  </Provider>
)
