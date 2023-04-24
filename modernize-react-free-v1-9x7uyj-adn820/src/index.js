import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import ContextProvider from './components/context/ContextProvider';
import Context from './components/context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
  <Suspense>
    <Context>
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
  </Context>
  </Suspense>
  </Provider>
);
