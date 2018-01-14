import * as React from 'react';
import Grid from './components/Grid';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>EtherBoxes</h1>
        <p>Welcome to EtherBoxes, where you can play the boxes on the Big Game with Ether.</p>

        <h2>How it works</h2>
        <p>
          EtherBoxes allows you play as many boxes as you want by allowing you buy a stake in a box. Simply pick a box
          and enter the amount of Ether you want to wager. At the end of the Big Game, come back to EtherBoxes and
          collect your portion of the winnings. There is a payout for each quarter and your portion of the winnings for
          a quarter is equal to a fourth of the total pot multiplied by your percentage stake in the winning the box.
          You can wager right up until the Big Game starts on February 4 at 6:30 PM EST.
        </p>

        <h4>Example Box Score from the Big Game, 2017</h4>
        <table className="table table-bordered">
          <tr>
            <th>Team</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>OT</th>
            <th>Final</th>
          </tr>

          <tr>
            <td>New England (Away)</td>
            <td>0</td>
            <td>3</td>
            <td>6</td>
            <td>19</td>
            <td>6</td>
            <td>34</td>
          </tr>

          <tr>
            <td>Atlanta (Home)</td>
            <td>0</td>
            <td>21</td>
            <td>7</td>
            <td>0</td>
            <td>0</td>
            <td>28</td>
          </tr>
        </table>

        <br/>

        <p>
          The table above is last year's box score for the Big Game. EtherBoxes would've paid out for the first three
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

        <h2>About us</h2>
        <p>
          We here at EtherBoxes are committed to a trustworthy and open experience.
          Feel free to audit all of our code <a href="https://github.com/etherboxes">here</a>.
        </p>
        <p>Our service charges 5% of each wager which gets transfered when the wager is made.</p>
      </div>
    );
  }
}
