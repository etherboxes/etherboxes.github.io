import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Grid, { GridCellComponent } from '../components/Grid';
import BetModal from '../components/BetModal';
import TimeToGame from '../components/TimeToGame';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import { connect } from 'react-redux';
import { AppState } from '../util/configureStore';
import { weiDisplay } from '../util/numberDisplay';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';

interface GridPageProps extends RouteComponentProps<{ square?: string }> {
}

export default connect(
  ({ bets: { total, loading } }: AppState) => ({ total, loading })
)(
  class GridPage extends React.Component<GridPageProps & { loading: boolean; total: string }> {
    closeModal = () => this.props.history.push('/');

    render() {
      const { match: { params: { square } }, total, loading } = this.props;

      const pathScore = typeof square === 'string' && /^\d-\d$/.test(square) ?
        square.split('-').map(s => +s) :
        null;

      const score = pathScore ? { home: pathScore[0], away: pathScore[1] } : null;

      return (
        <Segment loading={loading}>
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
        </Segment>
      );
    }
  }
);
