import * as React from 'react';
import GridPage from './components/GridPage';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import AppMenu from './components/AppMenu';
import { Route, Switch } from 'react-router';
import FAQPage from './FAQPage';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <AppMenu/>

        <Header as="h1">EtherSquares</Header>

        <Switch>
          <Route path="/grid" component={GridPage}/>
          <Route path="/faq" component={FAQPage}/>
        </Switch>
      </Container>
    );
  }
}
