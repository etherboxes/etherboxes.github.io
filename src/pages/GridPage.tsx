import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Grid from '../components/Grid';

interface Props extends RouteComponentProps<{}> {
}

export default class GridPage extends React.Component<Props> {
  render() {
    return (
      <div>
        <Grid/>
      </div>
    );
  }
}
