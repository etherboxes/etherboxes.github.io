import { Reducer } from 'redux';
import * as _ from 'underscore';

export interface Bet {
  address: string;
  total: string;
}

export interface SquareInfo {
  total: string;
  bets: Bet[];
}

export interface BetsState {
  [key: string]: SquareInfo;
}

const DEFAULT_STATE: BetsState = {};

_.range(0, 10).map(
  home => _.range(0, 10).map(away => {
    DEFAULT_STATE[ `${home}-${away}` ] = {
      total: '0',
      bets: []
    };
  })
);

export const betsReducer: Reducer<BetsState> = function (state: BetsState = DEFAULT_STATE): BetsState {
  return state;
};