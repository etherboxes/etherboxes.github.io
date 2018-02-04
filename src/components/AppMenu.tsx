import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';

export interface AppMenuProps {
}

const MenuLink = ({ name, to }: { to: string; name: string; }) => (
  <Route path={to} exact={true}>
    {({ match }) => <Menu.Item name={name} active={Boolean(match)} as={Link} to={to}/>}
  </Route>
);

export default class AppMenu extends React.Component<AppMenuProps> {
  render() {
    return (
      <Menu pointing={true} secondary={true} stackable={true}>
        <MenuLink name="Grid" to="/"/>
        <MenuLink name="Bets" to="/address"/>
        <MenuLink name="FAQ" to="/faq"/>
        <MenuLink name="Discussion" to="/discussion"/>
        <MenuLink name="Terms and Conditions" to="/terms-and-conditions"/>
      </Menu>
    );
  }
}
