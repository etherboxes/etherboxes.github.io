import * as React from 'react';
import { AppState } from '../util/configureStore';
import { connect } from 'react-redux';
import { SquareInfoMap } from '../reducers/betsReducers';
import { web3 } from '../contracts';
import BigNumber from 'web3/bower/bignumber.js/bignumber';
import Statistic from 'semantic-ui-react/dist/commonjs/views/Statistic/Statistic';
import { weiDisplay } from '../util/numberDisplay';

export interface BetStatisticsProps {
  score: { home: number; away: number; };
  amount: number;
}

export default connect(
  ({ bets: { squares, total } }: AppState) => ({ squares, total })
)(
  class BetStatistics extends React.Component<BetStatisticsProps & { squares: SquareInfoMap; total: string; }> {
    public render() {
      const { score: { home, away }, total, amount, squares } = this.props;

      const squareTotal = squares[`${home}-${away}`].total;

      const betAmountWei = new BigNumber(web3.toWei(amount, 'ether'));

      const percentageStake = betAmountWei
        .div(betAmountWei.add(squareTotal))
        .mul(100);

      const quarterWinnings = percentageStake
        .mul(total)
        .div(100)
        .div(4);

      return (
        <Statistic.Group widths="two" size="mini">
          <Statistic>
            <Statistic.Value>{percentageStake.round(3).valueOf()}%</Statistic.Value>
            <Statistic.Label>Stake</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{weiDisplay(quarterWinnings).valueOf()} ETH</Statistic.Value>
            <Statistic.Label>Potential Winnings (per quarter)</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      );
    }
  }
);
