import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { StateProvider } from './store/store';
import './styles/index.scss';

const app = (
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));
