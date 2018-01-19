import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Grid from '../components/Grid';
import Modal from 'semantic-ui-react/dist/commonjs/modules/Modal/Modal';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input/Input';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox/Checkbox';

interface Props extends RouteComponentProps<{ square?: string }> {
}

export default class GridPage extends React.Component<Props> {
  render() {
    const { history, match: { params: { square } } } = this.props;

    const betScore = typeof square === 'string' && /^\d-\d$/.test(square) ?
      square.split('-').map(s => +s) :
      null;

    return (
      <div>
        <Grid/>

        <Modal
          closeOnDimmerClick={true}
          closeOnEscape={true}
          size="small"
          open={Boolean(betScore)}
          dimmer="blurring"
          onClose={() => history.push('/')}
        >
          <Modal.Header>Bet on {square}</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>Amount</label>
                <Input type="number" required={true} step={0.001} min={0.001} placeholder="0.001eth"/>
              </Form.Field>
              <Form.Field>
                <Checkbox label="I agree that I understand the risks of using the Ethereum Squares contract"/>
              </Form.Field>
              <Form.Field>
                <Checkbox label="I agree that I understand the game of squares"/>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button positive={true}>
              Place bet
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
