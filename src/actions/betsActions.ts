import { Dispatch } from 'redux';
import { Squares } from '../contracts';
import { SQUARES_BLOCK_NUMBER } from '../util/constants';

export function getBets() {
  return function (dispatch: Dispatch<any>) {
    dispatch({ type: 'BETS_LOADING' });

    Squares.LogBet({}, { fromBlock: SQUARES_BLOCK_NUMBER })
      .get(
        (error, results) => {
          if (error) {
            dispatch({ type: 'ERROR_BETS_LOADING' });
          } else {
            dispatch({ type: 'BETS_LOADED', payload: results });
          }
        }
      );

    Squares.LogBet({}, { fromBlock: 'latest' })
      .watch(
        (error, result) => {
          if (error) {
            dispatch({ type: 'ERROR_BETS_WATCHING' });
          } else {
            dispatch({ type: 'BET_LOADED', payload: result });
          }
        }
      );
  };
}
