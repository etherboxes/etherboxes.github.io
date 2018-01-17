import * as React from 'react';
import * as _ from 'underscore';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import { RouteComponentProps } from 'react-router';

export default class GridPage extends React.Component<RouteComponentProps<{}>> {
  render() {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell/>
            <Table.HeaderCell colSpan={10}>Home Team score</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell/>
            {
              _.range(0, 10)
                .map(
                  home => <Table.HeaderCell key={home}>{home}</Table.HeaderCell>
                )
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            _.range(0, 10)
              .map(
                away => (
                  <Table.Row key={away}>
                    <Table.HeaderCell>{away}</Table.HeaderCell>
                    {
                      _.range(0, 10)
                        .map(
                          home => (
                            <Table.Cell key={`${home},${away}`}>
                              {home} - {away}
                            </Table.Cell>
                          )
                        )
                    }
                  </Table.Row>
                )
              )
          }
        </Table.Body>
      </Table>
    );
  }
}