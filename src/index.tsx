import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './util/configureStore';
import { getBets } from './actions/betsActions';
import { getVotingState } from './actions/votesActions';

const store = configureStore();

store.dispatch(getBets());
store.dispatch(getVotingState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
