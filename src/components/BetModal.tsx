import * as React from 'react';
import { Button, Divider, Form, Input, Modal, ModalProps } from 'semantic-ui-react';
import { canSend, Squares, web3 } from '../contracts';
import BetStatistics from './BetStatistics';

interface FormValue {
  acceptedToc: boolean;
  amount: string;
}

interface Props extends ModalProps {
  score: { home: number; away: number; } | null;
  onSuccess: () => void;
}

interface State {
  value: FormValue;
}

const DEFAULT_VALUE = {
  acceptedToc: false,
  amount: '0.01'
};

export default class BetModal extends React.Component<Props, State> {
  state = {
    value: DEFAULT_VALUE
  };

  handleChange = (value: FormValue) => this.setState({ value });

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.open && !this.props.open) {
      this.setState({ value: DEFAULT_VALUE });
    }
  }

  placeBet = () => {
    const { score, onSuccess } = this.props;
    const { value } = this.state;

    if (score) {
      web3.eth.getAccounts((accountsError, accounts) => {
        if (accountsError) {
          alert('failed to create transaction');
        } else {
          if (accounts.length === 0) {
            alert('must have at least one unlocked account!');
          } else {
            Squares.bet(
              score.home, score.away,
              { value: web3.toWei(value.amount, 'ether'), from: accounts[ 0 ] },
              (betError, result) => {
                console.log(betError, result);

                if (betError) {
                  alert('failed to place bet!');
                } else {
                  alert(`succeeded in placing bet of ${value.amount} ETH on square ${score.home} - ${score.away}`);
                  onSuccess();
                }
              }
            );
          }
        }
      });
    }
  };

  render() {
    const { score, onSuccess, ...rest } = this.props;
    const { value } = this.state;

    const isValueValid = value.amount && (+value.amount > 0);

    const ready = value.acceptedToc && score && isValueValid;

    return (
      <Modal
        closeIcon={true}
        closeOnDimmerClick={true}
        closeOnEscape={true}
        size="small"
        dimmer="inverted"
        {...rest}
      >
        <Modal.Header>
          Bet on square {score ? `Philadelphia ${score.home} to New England ${score.away}` : null}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Amount in ETH</label>
              <Input
                value={value.amount}
                onChange={e => this.handleChange({ ...value, amount: (e.target as any).value })}
                type="number"
                required={true}
                step={0.01}
                min={0.01}
                placeholder="0.01"
              />
            </Form.Field>
            <Form.Checkbox
              type="checkbox"
              required={true}
              checked={value.acceptedToc}
              onChange={e => this.handleChange({ ...value, acceptedToc: !value.acceptedToc })}
              label="I accept the terms and conditions"
            />
          </Form>

          <Divider horizontal={true}>Results</Divider>

          {
            score ?
              <BetStatistics score={score} amount={+value.amount}/> :
              null
          }
        </Modal.Content>
        <Modal.Actions>
          {
            !ready || !canSend ?
              (
                <small>
                  Please {
                  [
                    canSend ? null : 'use a browser that supports web3 or an extension e.g. MetaMask',
                    value.acceptedToc ? null : 'accept the terms and conditions',
                    isValueValid ? null : 'specify a valid bet amount'
                  ].filter(s => s !== null)
                    .join(' and ')
                }
                </small>
              ) : null
          }
          <Button
            disabled={!ready || !canSend}
            positive={true}
            onClick={this.placeBet}
            content="Place bet"
            secondary={true}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}
