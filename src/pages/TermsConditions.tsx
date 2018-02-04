import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Header } from 'semantic-ui-react';

export interface TermsConditionsProps extends RouteComponentProps<{}> {
}

export default class TermsConditions extends React.Component<TermsConditionsProps> {
  public render() {
    return (
      <div>
        <Header as="h2">
          Terms and Conditions
        </Header>
        <p>
          In order to participate in this game of squares, you must agree to the following terms
          and conditions.
        </p>
        <ol>
          <li>
            I understand the rules of the game of squares, and in particular EtherSquares's rules
            of play
          </li>
          <li>
            I understand the risk of an error in the Ethersquares smart contract causing loss of my
            funds
          </li>
          <li>
            The developer and maintainer of this site is not responsible for any funds sent to the
            smart contract
          </li>
          <li>
            Participation in this game of squares is legal in my country, province, state, and city
            of residence
          </li>
          <li>
            I understand I must vote to affirm the reported score during the voting period after
            the game
          </li>
        </ol>
      </div>
    );
  }
}
