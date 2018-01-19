import * as React from 'react';
import DisqusThread from '../components/DisqusThread';

interface Props {
}

export default class DiscussionPage extends React.Component<Props> {
  render() {
    return (
      <div>
        <DisqusThread/>
      </div>
    );
  }
}
