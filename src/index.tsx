import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './store/store';

import './index.scss';

const app = (
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
