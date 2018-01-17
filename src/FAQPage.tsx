import { RouteComponentProps } from 'react-router';
import * as React from 'react';

export default class FAQPage extends React.Component<RouteComponentProps<{}>> {
  render() {
    return (
      <div>
        <h2>FAQ</h2>
        <h3>How does it work?</h3>
        <h3>What do you mean decentralized?</h3>
        <p>
          Your money is held in escrow by a contract on the Ethereum network.
        </p>
        <h3>How can I trust you?</h3>
        <p>
          Feel free to audit all of the contract code
          on <a href="https://github.com/moodysalem/ethersquares">GitHub</a>.
        </p>
      </div>
    );
  }
}