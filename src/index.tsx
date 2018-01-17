import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter basename="/ethersquares/">
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
