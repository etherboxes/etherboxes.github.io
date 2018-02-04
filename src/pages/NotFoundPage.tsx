import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Header } from 'semantic-ui-react';

export default class NotFoundPage extends React.Component<RouteComponentProps<{}>> {
  render() {
    return (
      <div>
        <Header as="h1">
          Not found
        </Header>
        <p>
          The URL you entered was not valid
        </p>
      </div>
    );
  }
}
