import { RouteComponentProps } from 'react-router';
import * as React from 'react';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';

export default class FAQPage extends React.Component<RouteComponentProps<{}>> {
  render() {
    return (
      <div>
        <Header as="h1">FAQ</Header>
        <Header as="h2">How does it work?</Header>
        <ol>
          <li>
            You pick a square and send a transaction to the ethereum network with your choice and the amount of ether
            you'd like to offer.
          </li>
          <li>
            The contract tracks your wager as well as everyone else's wager.
          </li>
          <li>
            I report the score 1 day after the big game.
          </li>
          <li>
            Once I report the score, the community participating in the grid has 7 days to affirm it.
          </li>
          <li>
            Votes are weighted by total stake in the grid. If you offer 0.3 ETH on one square and 0.1 ETH on another
            square, your total influence on the vote is 0.4 ETH.
          </li>
          <li>
            7 days after I report the score, if 2/3rds of the voters agree that I was honest, anyone can accept the
            final score to release the winnings from escrow. Winners can visit the site to collect their winnings.
          </li>
          <li>
            If I was not honest, I can correct the score and resubmit for approval.
          </li>
        </ol>

        <Header as="h2">How is this better than a centralized version?</Header>
        <p>
          Your money is held in escrow by a contract on the Ethereum network. I collect no fees because I run no
          infrastructure. The private key used to report the score is held by multiple people, so the score will be
          reported.
        </p>

        <Header as="h2">How can I trust you?</Header>
        <p>
          You don't have to. You are free to review the verified source code of the underlying contracts.
          I never have control over your funds, thanks to the Ethereum network.
          I built the system such that I cannot cheat it and have no incentives to lie about the score.
        </p>
        <ul>
          <li>
            <a href="https://etherscan.io/address/0x96e9ace417632353da8133f8471769c796641c30#code">
              Squares Contract
            </a>
          </li>
          <li>
            <a href="https://etherscan.io/address/0x42b81fb65d24f547aee4f012e6953e41d0be0d5e#code">
              Voting Based Oracle
            </a>
          </li>
        </ul>

        <Header as="h2">Do I have to use this site to play?</Header>
        <p>
          You are not required to interact with the contracts via this website. You may copy the ABI of the contracts
          into a wallet (e.g. <a href="https://www.myetherwallet.com/#contracts">MyEtherWallet</a>) and send
          transactions directly to the contract. It is simply more convenient to use this site.
        </p>

        <Header as="h2">What is the donation percentage?</Header>
        <p>
          When you collect your winnings, you may optionally specify a percentage of the winnings to donate to
          compensate me for my development hours.
        </p>

        <Header as="h2">Is this legal?</Header>
        <p>
          I am never in possession of any money. I do not collect any fees. I simply wrote the code.
          It is probably as legal as the common office game of squares.
          Check with your local government regarding the legality of participating in such a contest.
        </p>

        <Header as="h2">Can I run this site locally?</Header>
        <p>
          Yes, you may download the html, js, and css files. All external resource links, excluding google analytics,
          come with subresource integrity hashes.
        </p>
      </div>
    );
  }
}