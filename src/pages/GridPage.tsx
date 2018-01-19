import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Grid from '../components/Grid';
import BetModal from '../components/BetModal';
import TimeToGame from '../components/TimeToGame';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import { connect } from 'react-redux';
import { AppState } from '../util/configureStore';
import numberDisplay from '../util/numberDisplay';
import { web3 } from '../contracts';

interface Props extends RouteComponentProps<{ square?: string }> {
}

export default connect(
  ({ bets: { total } }: AppState) => ({ total })
)(
  class GridPage extends React.Component<Props & { total: string }> {
    closeModal = () => this.props.history.push('/');

    render() {
      const { match: { params: { square } }, total } = this.props;

      const pathScore = typeof square === 'string' && /^\d-\d$/.test(square) ?
        square.split('-').map(s => +s) :
        null;

      const score = pathScore ? { home: pathScore[ 0 ], away: pathScore[ 1 ] } : null;

      return (
        <div>
          <Header as="h2" style={{ textAlign: 'center' }}>
            <TimeToGame/>
          </Header>

          <Header as="h3" style={{ textAlign: 'center' }}>
            Total pot: {numberDisplay(web3.fromWei(total, 'ether'))} ETH
          </Header>

          <Grid/>

          <BetModal
            open={Boolean(pathScore)}
            score={score}
            onClose={this.closeModal}
            onSuccess={this.closeModal}
          />
        </div>
      );
    }
  }
);