import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from '@/app';
import { store } from '@/app/app-store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} stabilityCheck="never">
      <App />
    </Provider>
  </React.StrictMode>
);
