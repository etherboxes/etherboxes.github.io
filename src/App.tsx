import * as React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import AppMenu from './components/AppMenu';
import { Route, Switch } from 'react-router';
import FAQPage from './pages/FAQPage';
import GridPage from './pages/GridPage';
import NotFoundPage from './pages/NotFoundPage';
import DiscussionPage from './pages/DiscussionPage';

export default class App extends React.Component {
  render() {
    return (
      <Container style={{ marginTop: 10 }}>
        <AppMenu/>

        <Switch>
          <Route path="/" exact={true} component={GridPage}/>
          <Route path="/bet/:square" exact={true} component={GridPage}/>
          <Route path="/discussion" exact={true} component={DiscussionPage}/>
          <Route path="/faq" exact={true} component={FAQPage}/>
          <Route path="*" component={NotFoundPage}/>
        </Switch>

        <div style={{ height: 40 }}/>
      </Container>
    );
  }
}
