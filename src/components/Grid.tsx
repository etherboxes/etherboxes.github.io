import * as React from 'react';
import * as _ from 'underscore';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import { Link } from 'react-router-dom';

export default class Grid extends React.Component<{}> {
  render() {
    return (
      <Table unstackable={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell rowSpan={2} colSpan={2}/>
            <Table.HeaderCell textAlign="center" colSpan={10}>Home team score</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            {
              _.range(0, 10)
                .map(
                  home => <Table.HeaderCell textAlign="center" key={home}>{home}</Table.HeaderCell>
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
                    {
                      away === 0 ? (
                        <Table.HeaderCell
                          textAlign="center"
                          verticalAlign="middle"
                          rowSpan={10}
                          style={{ width: 40 }}
                        >
                          <div
                            style={{ transform: 'rotate(-90deg) translateX(-30px)', whiteSpace: 'nowrap', width: 40 }}
                          >
                            Away team score
                          </div>
                        </Table.HeaderCell>
                      ) : null
                    }
                    <Table.HeaderCell textAlign="center">{away}</Table.HeaderCell>
                    {
                      _.range(0, 10)
                        .map(
                          home => (
                            <Table.Cell textAlign="center" selectable={true} key={`${home}-${away}`}>
                              <Link to={`/bid/${home}-${away}`}>{home} - {away}</Link>
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