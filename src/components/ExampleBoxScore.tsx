import * as React from 'react';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';

export default class ExampleBoxScore extends React.Component {
  render() {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>1</Table.HeaderCell>
            <Table.HeaderCell>2</Table.HeaderCell>
            <Table.HeaderCell>3</Table.HeaderCell>
            <Table.HeaderCell>4</Table.HeaderCell>
            <Table.HeaderCell>OT</Table.HeaderCell>
            <Table.HeaderCell>Final</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell><strong>Atlanta</strong> (Home)</Table.Cell>
            <Table.Cell>0</Table.Cell>
            <Table.Cell>21</Table.Cell>
            <Table.Cell>7</Table.Cell>
            <Table.Cell>0</Table.Cell>
            <Table.Cell>0</Table.Cell>
            <Table.Cell>28</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell><strong>New England</strong> (Away)</Table.Cell>
            <Table.Cell>0</Table.Cell>
            <Table.Cell>3</Table.Cell>
            <Table.Cell>6</Table.Cell>
            <Table.Cell>19</Table.Cell>
            <Table.Cell>6</Table.Cell>
            <Table.Cell>34</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}