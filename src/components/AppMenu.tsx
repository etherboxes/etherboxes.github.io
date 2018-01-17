import * as React from 'react';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
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
      <Menu pointing={true} secondary={true}>
        <MenuLink name="Grid" to="/grid"/>
        <MenuLink name="About" to="/about"/>
        <MenuLink name="FAQ" to="/faq"/>
      </Menu>
    );
  }
}