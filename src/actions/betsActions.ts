import { Dispatch } from 'redux';
import { Squares } from '../contracts';
import { SQUARES_BLOCK_NUMBER } from '../util/constants';

export function getBets() {
  return function (dispatch: Dispatch<any>) {
    dispatch({ type: 'BETS_LOADING' });

    Squares.LogBets(null, { fromBlock: SQUARES_BLOCK_NUMBER }).get(
      (error, results) => {
        console.log(results);
      }
    );
  };
}
