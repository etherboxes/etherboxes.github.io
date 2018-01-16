import * as React from 'react';
import Grid from './components/Grid';
import ExampleBoxScore from './components/ExampleBoxScore';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import AppMenu from './components/AppMenu';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <AppMenu/>

        <Header as="h1">EtherSquares</Header>
        <p>
          Welcome to EtherSquares, where you can play a completely unfair, free decentralized game of squares on Ether.
        </p>

        <h2>How it works</h2>
        <p>
          EtherSquares allows you play as many boxes as you want by allowing you buy a stake in a box. Simply pick a box
          and enter the amount of Ether you want to wager. At the end of the Big Game, come back to EtherSquares and
          collect your portion of the winnings. There is a payout for each quarter and your portion of the winnings for
          a quarter is equal to a fourth of the total pot multiplied by your percentage stake in the winning the box.
          You can wager right up until the Big Game starts on February 4 at 6:30 PM EST.
        </p>

        <h3>Example Box Score from the Big Game, 2017</h3>
        <ExampleBoxScore/>

        <br/>

        <p>
          The table above is last year's box score for the Big Game. EtherSquares would've paid out for the first three
          quarters and the final score -- we don't include overtime as a quarter.
        </p>

        <p>
          At the end of the third quarter, the score of the game was 28-9. The winning box for that quarter was (8,9)
          since the home team score ended in an 8 and the away team score ended in a 9. If the total pot was 10,000 ETH,
          2,500 ETH would've been paid out for that quarter since 1/4 of the total pot is won for each quarter. If the
          total wager on that box was 250 ETH and 5 of that ETH was your wager, your stake in the box was 2%. That
          would've resulted in you winning 50 ETH (2% of 2,500 ETH) for your 5 ETH wager.
        </p>

        <p>
          A box can win more than once. If the first quarter ends with a score of 13-7 in favor of the home team and
          never changes, then (3,7) will be the winning box for each quarter. With a 10,000 ETH total pot and a 2% stake
          in that box, you'll win 200 ETH.
        </p>

        <Grid/>

        <h2>FAQ</h2>
        <h3>What do you mean decentralized?</h3>
        <p>
          Your money is held in escrow by a contract on the Ethereum network.
        </p>
        <h3>How can I trust you?</h3>
        <p>
          Feel free to audit all of the contract code
          on <a href="https://github.com/moodysalem/ethersquares">GitHub</a>.
        </p>
      </Container>
    );
  }
}
