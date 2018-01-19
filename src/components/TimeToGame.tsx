import * as React from 'react';
import { Squares } from '../contracts';
import BigNumber from 'web3/bower/bignumber.js/bignumber';
import * as _ from 'underscore';
import * as moment from 'moment';

const getGameTime = _.once(
  function (): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      Squares.GAME_START_TIME((error, result: BigNumber) => {
        if (error) {
          reject();
        } else {
          resolve(+result.valueOf());
        }
      });
    });
  }
);

export default class TimeToGame extends React.Component<{}, { gameTime: number | null }> {
  state = {
    gameTime: null
  };

  timer = setInterval(() => this.forceUpdate(), 1000);

  componentDidMount() {
    getGameTime()
      .then(
        gameTime => this.setState({ gameTime })
      );
  }

  render() {
    const { gameTime } = this.state;

    if (!gameTime) {
      return null;
    }

    return (
      <span>
        Betting ends <strong>{moment(gameTime * 1000).fromNow()}</strong>
      </span>
    );
  }
}
