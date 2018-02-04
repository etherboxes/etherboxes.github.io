import { Action, Reducer } from 'redux';
import * as _ from 'underscore';
import BigNumber from 'web3/bower/bignumber.js/bignumber';

export interface SquareBet {
  better: string;
  stake: string;
}

export interface Bet extends SquareBet {
  home: string;
  away: string;
}

export interface SquareInfo {
  total: string;
  bets: SquareBet[];
}

export interface SquareInfoMap {
  [key: string]: SquareInfo;
}

export interface BetsState {
  loading: boolean;
  total: string;
  all: Bet[],
  squares: SquareInfoMap;
}

const DEFAULT_STATE: BetsState = {
  loading: false,
  total: '0',
  all: [],
  squares: {}
};

const DEFAULT_SQUARE_INFO: SquareInfo = {
  total: '0',
  bets: []
};

_.range(0, 10).map(
  home => _.range(0, 10).map(away => {
    DEFAULT_STATE.squares[ `${home}-${away}` ] = DEFAULT_SQUARE_INFO;
  })
);

interface BetEvent {
  args: {
    better: string;
    home: BigNumber;
    away: BigNumber;
    stake: BigNumber
  };
}

export const betsReducer: Reducer<BetsState> = function (state: BetsState = DEFAULT_STATE, action: Action): BetsState {
  switch (action.type) {
    case 'BETS_LOADING': {
      return { ...state, loading: true };
    }

    case 'BETS_LOADED': {
      const bets: BetEvent[] = (action as any).payload as any;

      const bySquare = _.groupBy(
        bets,
        ({ args: { home, away } }) => `${home.valueOf()}-${away.valueOf()}`
      );

      let total = new BigNumber(0);

      bets.forEach(b => {
        total = total.add(b.args.stake);
      });

      return {
        loading: false,
        total: total.valueOf(),
        all: bets.map(({ args: { stake, away, home, better } }) => ({
          better,
          stake: stake.valueOf(),
          home: home.valueOf(),
          away: away.valueOf()
        })),
        squares: _.mapObject(
          DEFAULT_STATE.squares,
          (value, key) => {
            const eventsBySquare = bySquare[ key ];

            if (!eventsBySquare) {
              return DEFAULT_SQUARE_INFO;
            }

            let squareTotal = new BigNumber(0);

            _.each(eventsBySquare, ({ args: { stake } }) => {
              squareTotal = squareTotal.add(stake);
            });

            return {
              total: squareTotal.valueOf(),
              bets: eventsBySquare.map(
                ({ args: { better, stake } }) => ({
                  better,
                  stake: stake.valueOf()
                })
              )
            };
          }
        )
      };
    }

    case 'BET_LOADED': {
      const { args: { better, home, away, stake } }: BetEvent = (action as any).payload;

      const key = `${home.valueOf()}-${away.valueOf()}`;
      const square = state.squares[ key ];

      return {
        ...state,
        all: state.all.concat([ { better, stake: stake.valueOf(), home: home.valueOf(), away: away.valueOf() } ]),
        total: new BigNumber(stake).add(state.total).valueOf(),
        [ key ]: {
          total: new BigNumber(stake).add(square.total).valueOf(),
          bets: square.bets.concat([
            { better, stake: stake.valueOf() }
          ])
        }
      };
    }

    default:
      break;
  }

  return state;
};
