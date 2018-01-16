import * as React from 'react';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';

export interface AppMenuProps {
}

export default class AppMenu extends React.Component<AppMenuProps> {
  render() {
    return (
      <Menu pointing={true} secondary={true}>
        <Menu.Item name="Grid" active={false} onClick={() => null}/>
        <Menu.Item name="About" active={false} onClick={() => null}/>
        <Menu.Item name="FAQ" active={false} onClick={() => null}/>
      </Menu>
    );
  }
}