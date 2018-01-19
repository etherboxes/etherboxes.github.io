import { Action, Reducer } from 'redux';
import * as _ from 'underscore';
import BigNumber from 'web3/bower/bignumber.js/bignumber';

export interface Bet {
  address: string;
  stake: string;
}

export interface SquareInfo {
  total: string;
  bets: Bet[];
}

export interface BetsState {
  [key: string]: SquareInfo;
}

const DEFAULT_STATE: BetsState = {};

const DEFAULT_SQUARE_INFO: SquareInfo = {
  total: '0',
  bets: []
};

_.range(0, 10).map(
  home => _.range(0, 10).map(away => {
    DEFAULT_STATE[ `${home}-${away}` ] = DEFAULT_SQUARE_INFO;
  })
);

export const betsReducer: Reducer<BetsState> = function (state: BetsState = DEFAULT_STATE, action: Action): BetsState {
  switch (action.type) {
    case 'BETS_LOADED': {

      const bets: Array<{
        address: string;
        args: {
          better: string;
          home: BigNumber;
          away: BigNumber;
          stake: BigNumber
        };
      }> = (action as any).payload as any;

      const bySquare = _.groupBy(
        bets,
        ({ args: { home, away } }) => `${home.valueOf()}-${away.valueOf()}`
      );

      return _.mapObject(
        DEFAULT_STATE,
        (value, key) => {
          const forKey = bySquare[ key ];

          if (!forKey) {
            return DEFAULT_SQUARE_INFO;
          }

          let total = new BigNumber(0);

          _.each(forKey, ({ args: { stake } }) => {
            total = total.add(stake);
          });

          return {
            total: total.valueOf(),
            bets: forKey.map(
              ({ args: { better, stake } }) => ({
                address: better,
                stake: stake.valueOf()
              })
            )
          };
        }
      );
    }

    case 'BET_LOADED': {
      // const { args: { better, home, away, stake } } =;
      break;
    }

    default:
      break;
  }

  return state;
};