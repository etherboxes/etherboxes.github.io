import * as React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal/Modal';
import { ModalProps } from 'semantic-ui-react';
import { canSend, Squares, web3 } from '../contracts';
import Message from 'semantic-ui-react/dist/commonjs/collections/Message/Message';

interface FormValue {
  acceptedRisks: boolean;
  acceptedUnderstand: boolean;
  acceptedLiability: boolean;
  acceptedLegality: boolean;
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
  acceptedRisks: false,
  acceptedUnderstand: false,
  acceptedLiability: false,
  acceptedLegality: false,
  amount: '0.1'
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
    const { score, ...rest } = this.props;
    const { value } = this.state;

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
          Bet on square {score ? `${score.home} - ${score.away}` : null}
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
                step={0.001}
                min={0.001}
                placeholder="0.001eth"
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                checked={value.acceptedUnderstand}
                onChange={e => this.handleChange({ ...value, acceptedUnderstand: !value.acceptedUnderstand })}
                label="I understand the game of squares"
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                checked={value.acceptedRisks}
                onChange={e => this.handleChange({ ...value, acceptedRisks: !value.acceptedRisks })}
                label="I understand the risk for potential errors in the smart contract code to cause loss of funds"
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                checked={value.acceptedLiability}
                onChange={e => this.handleChange({ ...value, acceptedLiability: !value.acceptedLiability })}
                label={'I agree that the developer is not liable for any risk ' +
                'associated with my use of the Ethereum squares contract'}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                checked={value.acceptedLegality}
                onChange={e => this.handleChange({ ...value, acceptedLegality: !value.acceptedLegality })}
                label={'Participation in this game of squares is legal in my country, province, state, ' +
                'and city of residence'}
              />
            </Form.Field>
          </Form>

          {
            !canSend ?
              <Message warning={true}>You must have MetaMask to send bets</Message> :
              null
          }
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled={
              !canSend ||
              !value.acceptedLiability ||
              !score ||
              !value.acceptedRisks ||
              !value.acceptedUnderstand ||
              !value.acceptedLegality ||
              !value.amount
            }
            positive={true}
            onClick={this.placeBet}
          >
            Place bet
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
