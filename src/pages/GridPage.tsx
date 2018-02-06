import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Grid, { GridCellComponent } from '../components/Grid';
import BetModal from '../components/BetModal';
import TimeToGame from '../components/TimeToGame';
import { Button, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { AppState } from '../util/configureStore';
import { weiDisplay } from '../util/numberDisplay';
import * as moment from 'moment';
import { canSend, VotingBasedOracle, web3 } from '../contracts';

interface GridPageProps extends RouteComponentProps<{ square?: string }> {
  loading: boolean;
  total: string,
  accepted: boolean;
  finalized: boolean;
  votingPeriodStartTime: string | null;
}

export default connect(
  ({ bets: { total, loading }, votes: { votingPeriodStartTime, finalized, accepted } }: AppState) => ({
    total,
    loading,
    votingPeriodStartTime,
    finalized,
    accepted
  })
)(
  class GridPage extends React.Component<GridPageProps> {
    closeModal = () => this.props.history.push('/');

    vote = affirm => {
      web3.eth.getAccounts((accountError, accounts) => {
        if (accountError) {
          alert(`failed to get accounts: ${accountError.message}`);
          console.error(accountError);
          return;
        }

        if (accounts.length === 0) {
          alert('no accounts available to vote');
        }

        VotingBasedOracle.vote(affirm, { from: accounts[ 0 ] }, (error, result) => {
          if (error) {
            alert('failed to vote: ' + error.message);
          } else {
            alert('your vote is counted!');
          }
        });
      });

    };

    rejectScores = () => {
      this.vote(false);
    };

    acceptScores = () => {
      this.vote(true);
    };

    render() {
      const { match: { params: { square } }, total, loading, finalized, accepted, votingPeriodStartTime } = this.props;

      const pathScore = typeof square === 'string' && /^\d-\d$/.test(square) ?
        square.split('-').map(s => +s) :
        null;

      const score = pathScore ? { home: pathScore[ 0 ], away: pathScore[ 1 ] } : null;

      return (
        <Segment loading={loading} key="grid">
          <Header as="h2" style={{ textAlign: 'center' }}>
            The "Big Game" on Feb 4 @ 6:30PM Eastern
          </Header>
          <Header as="h3" style={{ textAlign: 'center', marginTop: 8 }}>
            <div>Total pot: {weiDisplay(total)} ETH, <TimeToGame/></div>
          </Header>

          <Grid cellComponent={GridCellComponent}/>

          <BetModal
            open={Boolean(pathScore) && !loading}
            score={score}
            onClose={this.closeModal}
            onSuccess={this.closeModal}
          />

          <Header as="h4">
            Voting period: finalized: {finalized ? 'true' : 'false'}, accepted: {accepted ? 'true' : 'false'},
            started {votingPeriodStartTime ? moment(+votingPeriodStartTime * 1000).fromNow() : '...'}, lasts 7 days
          </Header>

          <Button
            disabled={!finalized || accepted || !canSend}
            negative={true}
            onClick={this.rejectScores}
            content="Reject scores"
          />
          <Button
            disabled={!finalized || accepted || !canSend}
            positive={true}
            onClick={this.acceptScores}
            content="Confirm scores"
          />

          {
            !canSend ? <small>You must be using a browser that supports web3 to vote</small> : null
          }
        </Segment>
      );
    }
  }
);
