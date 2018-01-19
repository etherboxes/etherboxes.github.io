import * as React from 'react';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import AppMenu from './components/AppMenu';
import { Route, Switch } from 'react-router';
import FAQPage from './pages/FAQPage';
import GridPage from './pages/GridPage';
import DisqusPage from './pages/DisqusPage';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <AppMenu/>

        <Switch>
          <Route path="/" exact={true} component={GridPage}/>
          <Route path="/faq" exact={true} component={FAQPage}/>
          <Route path="/discussion" exact={true} component={DisqusPage}/>
        </Switch>

        <div style={{ height: 40 }}/>
      </Container>
    );
  }
}
