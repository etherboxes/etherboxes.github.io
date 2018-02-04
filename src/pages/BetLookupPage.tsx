import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { AppState } from '../util/configureStore';
import * as _ from 'underscore';
import { Form, Input, Message, Segment } from 'semantic-ui-react';
import { web3 } from '../contracts';
import { Bet } from '../reducers/betsReducers';
import { weiDisplay } from '../util/numberDisplay';
import Timer = NodeJS.Timer;

interface BetLookupPageProps extends RouteComponentProps<{ addr?: string }> {
  allBets: Bet[]
  loading: boolean;
}

export default connect(
  ({ bets: { all, loading } }: AppState) => ({ allBets: all, loading })
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
      const { allBets, history, loading, match: { params } } = this.props;
      const { accounts } = this.state;

      const address = params.addr;

      return (
        <Segment loading={loading}>
          <Form>
            <Form.Field>
              <label>Enter an address</label>
              <Input
                type="text"
                placeholder="0x000000..."
                value={address || ''}
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
            address && web3.isAddress(address) ? (
                <dl>
                  {
                    _.chain(allBets)
                      .filter(({ better }) => better === address)
                      .map(({ stake, home, away, better }, ix) => (
                        <div key={ix}>
                          Bet {weiDisplay(stake)} ETH on square {home}, {away}
                        </div>
                      ))
                      .value()
                  }
                </dl>
              ) :
              <Message warning={true}>
                Input an address to look up bets
              </Message>
          }
        </Segment>
      );
    }
  }
);