import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../util/configureStore';
import * as _ from 'underscore';
import { Form, Input, Message, Segment, Table } from 'semantic-ui-react';
import { web3 } from '../contracts';
import { Bet, SquareInfoMap } from '../reducers/betsReducers';
import { weiDisplay } from '../util/numberDisplay';
import BigNumber from 'web3/bower/bignumber.js/bignumber';
import Timer = NodeJS.Timer;

interface BetLookupPageProps extends RouteComponentProps<{ addr?: string }> {
  allBets: Bet[];
  squares: SquareInfoMap;
  total: string;
  loading: boolean;
}

export default connect(
  ({ bets: { all, loading, squares, total } }: AppState) => ({ allBets: all, loading, squares, total })
)(
  class BetLookupPage extends React.Component<BetLookupPageProps, { accounts: string[] }> {
    state = {
      accounts: []
    };

    timer: Timer;

    componentDidMount() {
      this.timer = setInterval(this.updateAccounts, 1000);
    }

    componentWillUnmount() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }

    updateAccounts = () => {
      web3.eth.getAccounts((err, accounts) => {
        if (!err) {
          this.setState({ accounts });
        } else {
          alert(err.message);
        }
      });
    };

    render() {
      const { allBets, history, loading, squares, total, match: { params: { addr } } } = this.props;
      const { accounts } = this.state;

      const userBets: Bet[] = addr ? _.filter(
        allBets,
        ({ better }) => better === addr
      ) : [];

      const userSquareTotals: { [square: string]: string } = {};

      _.each(
        userBets,
        ({ home, away, better, stake }) => {
          const key = `${home}-${away}`;
          userSquareTotals[ key ] = (new BigNumber(stake)).add(userSquareTotals[ key ] || 0).valueOf();
        }
      );

      return (
        <Segment loading={loading}>
          <Form>
            <Form.Field>
              <label>Enter an address</label>
              <Input
                type="text"
                placeholder="0x000000..."
                value={addr || ''}
                onChange={({ target: { value } }: any) => history.push(`/address/${value}`)}
                list="my-accounts"
              />
              <datalist id="my-accounts">
                {
                  _.map(
                    accounts,
                    (account) => <option key={account} value={account}/>
                  )
                }
              </datalist>
            </Form.Field>
          </Form>

          {
            addr && web3.isAddress(addr) ? (
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Square</Table.HeaderCell>
                      <Table.HeaderCell>Stake</Table.HeaderCell>
                      <Table.HeaderCell>Ownership</Table.HeaderCell>
                      <Table.HeaderCell>Winnings per quarter</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {
                      _.map(
                        userSquareTotals,
                        (userSquareStake, square) => (
                          <Table.Row key={square}>
                            <Table.Cell>{square}</Table.Cell>
                            <Table.Cell>{weiDisplay(userSquareStake)} ETH</Table.Cell>
                            <Table.Cell>
                              {
                                (new BigNumber(userSquareStake))
                                  .div(squares[ square ].total)
                                  .mul(100)
                                  .round(5)
                                  .valueOf()
                              }%
                            </Table.Cell>
                            <Table.Cell>
                              {
                                weiDisplay(
                                  (new BigNumber(userSquareStake))
                                    .div(squares[ square ].total)
                                    .mul(total)
                                    .round(5)
                                )
                              } ETH
                            </Table.Cell>
                          </Table.Row>
                        )
                      )
                    }
                  </Table.Body>
                </Table>
              ) :
              <Message warning={true}>
                Input a valid address to look up bets
              </Message>
          }
        </Segment>
      );
    }
  }
);