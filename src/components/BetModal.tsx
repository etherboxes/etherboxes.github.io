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
  amount: string;
}

interface Props extends ModalProps {
  score: { home: number; away: number; } | null;
}

interface State {
  value: FormValue;
}

const DEFAULT_VALUE = { acceptedRisks: false, acceptedUnderstand: false, amount: '1' };

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
    const { score } = this.props;
    const { value } = this.state;

    if (score) {
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          alert('failed to create transaction');
        } else {
          Squares.bet(
            score.home, score.away,
            { value: web3.toWei(value.amount, 'ether'), from: accounts[ 0 ] },
            (betError, result) => {
              console.log(betError, result);
            }
          );
        }
      });
    }
  };

  render() {
    const { score, ...rest } = this.props;
    const { value } = this.state;

    return (
      <Modal
        closeOnDimmerClick={true}
        closeOnEscape={true}
        size="small"
        dimmer="blurring"
        {...rest}
      >
        <Modal.Header>Bet on square {score ? `${score.home} - ${score.away}` : null}</Modal.Header>
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
                checked={value.acceptedRisks}
                onChange={e => this.handleChange({ ...value, acceptedRisks: !value.acceptedRisks })}
                label="I agree that I understand the risks of using the Ethereum Squares contract"
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                checked={value.acceptedUnderstand}
                onChange={e => this.handleChange({ ...value, acceptedUnderstand: !value.acceptedUnderstand })}
                label="I agree that I understand the game of squares"
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
            disabled={!canSend || !score || !value.acceptedRisks || !value.acceptedUnderstand || !value.amount}
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
