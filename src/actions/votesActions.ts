import { Dispatch } from 'redux';
import { VotingBasedOracle } from '../contracts';
import { SQUARES_BLOCK_NUMBER } from '../util/constants';
import * as _ from 'underscore';

export const FINALIZED_LOADED = 'FINALIZED_LOADED';
export const ACCEPTED_LOADED = 'ACCEPTED_LOADED';
export const VOTES_LOADED = 'VOTES_LOADED';
export const SQUARE_WINS_LOADED = 'SQUARE_WINS_LOADED';
export const VOTING_PERIOD_START_TIME_LOADED = 'VOTING_PERIOD_START_TIME_LOADED';

export function getVotingState() {
  return function (dispatch: Dispatch<any>) {
    VotingBasedOracle.finalized((error, result) => {
      if (!error) {
        dispatch({ type: FINALIZED_LOADED, payload: result });
      }
    });

    VotingBasedOracle.accepted((error, result) => {
      if (!error) {
        dispatch({ type: ACCEPTED_LOADED, payload: result });
      }
    });

    _.each(
      _.range(0, 10),
      home => {
        _.each(
          _.range(0, 10),
          away => {
            VotingBasedOracle.squareWins(home, away, (error, result) => {
              if (!error) {
                dispatch({ type: SQUARE_WINS_LOADED, meta: { home, away }, payload: result });
              }
            });
          }
        );
      }
    );

    VotingBasedOracle.votingPeriodStartTime((error, result) => {
      if (!error) {
        dispatch({ type: VOTING_PERIOD_START_TIME_LOADED, payload: result });
      }
    });

    VotingBasedOracle.LogVote({}, { fromBlock: SQUARES_BLOCK_NUMBER })
      .get(
        (error, results) => {
          if (!error) {
            dispatch({ type: VOTES_LOADED, payload: results });
          }
        }
      );
    //
    // VotingBasedOracle.LogBet({}, { fromBlock: 'latest' })
    //   .watch(
    //     (error, result) => {
    //       if (error) {
    //         dispatch({ type: 'ERROR_BETS_WATCHING' });
    //       } else {
    //         dispatch({ type: 'BET_LOADED', payload: result });
    //       }
    //     }
    //   );
  };
}
