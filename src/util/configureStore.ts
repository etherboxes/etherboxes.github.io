import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { betsReducer, BetsState } from '../reducers/betsReducers';
import { votesReducer, VotesState } from '../reducers/votesReducer';

const composeEnhancers: any = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface AppState {
  bets: BetsState;
  votes: VotesState;
}

export default function configureStore() {
  return createStore(
    combineReducers({
      bets: betsReducer,
      votes: votesReducer
    }),
    composeEnhancers(
      applyMiddleware(
        thunk
      )
    )
  );
}