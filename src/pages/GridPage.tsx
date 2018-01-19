import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Grid from '../components/Grid';
import BetModal from '../components/BetModal';
import TimeToGame from '../components/TimeToGame';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';

interface Props extends RouteComponentProps<{ square?: string }> {
}

export default class GridPage extends React.Component<Props> {
  render() {
    const { history, match: { params: { square } } } = this.props;

    const pathScore = typeof square === 'string' && /^\d-\d$/.test(square) ?
      square.split('-').map(s => +s) :
      null;

    const score = pathScore ? { home: pathScore[ 0 ], away: pathScore[ 1 ] } : null;

    return (
      <div>
        <Header as="h3" style={{ textAlign: 'center' }}>
          <TimeToGame/>
        </Header>

        <Grid/>

        <BetModal
          open={Boolean(pathScore)}
          score={score}
          onClose={() => history.push('/')}
        />
      </div>
    );
  }
}
