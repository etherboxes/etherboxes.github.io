import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { betsReducer, BetsState } from '../reducers/betsReducers';

const composeEnhancers: any = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface AppState {
  bets: BetsState;
}

export default function configureStore() {
  return createStore(
    combineReducers({
      bets: betsReducer
    }),
    composeEnhancers(
      applyMiddleware(
        thunk
      )
    )
  );
}