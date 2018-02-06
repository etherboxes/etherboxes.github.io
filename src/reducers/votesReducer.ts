import { Action, Reducer } from 'redux';
import {
  ACCEPTED_LOADED,
  FINALIZED_LOADED,
  SQUARE_WINS_LOADED,
  VOTING_PERIOD_START_TIME_LOADED
} from '../actions/votesActions';

export interface SquareWinsMap {
  [square: string]: string
}

export interface VotesState {
  votingPeriodStartTime: string | null;
  accepted: boolean;
  finalized: boolean;
  squareWins: SquareWinsMap;
}

const DEFAULT_STATE: VotesState = {
  votingPeriodStartTime: null,
  accepted: false,
  finalized: false,
  squareWins: {}
};

export const votesReducer: Reducer<VotesState> =
  function (state: VotesState = DEFAULT_STATE, action: Action): VotesState {
    switch (action.type) {
      case VOTING_PERIOD_START_TIME_LOADED: {
        return { ...state, votingPeriodStartTime: (action as any).payload };
      }

      case ACCEPTED_LOADED: {
        return { ...state, accepted: (action as any).payload };
      }

      case FINALIZED_LOADED: {
        return { ...state, finalized: (action as any).payload };
      }

      case SQUARE_WINS_LOADED: {
        const { meta: { home, away }, payload } = action as any;

        return { ...state, squareWins: { ...state.squareWins, [ `${home}-${away}` ]: payload } };
      }

      default:
        break;
    }

    return state;
  };
