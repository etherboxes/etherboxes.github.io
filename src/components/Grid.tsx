import * as React from 'react';
import { AllHTMLAttributes } from 'react';
import * as _ from 'underscore';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../util/configureStore';
import { SquareInfoMap } from '../reducers/betsReducers';
import { web3 } from '../contracts';
import numberDisplay from '../util/numberDisplay';

function LimitedWidthDiv(props: AllHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        ...props.style,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}
    />
  );
}

export default connect(
  ({ bets: { squares } }: AppState) => ({ squares })
)(
  class Grid extends React.Component<{ squares: SquareInfoMap }> {
    render() {
      const { squares } = this.props;

      return (
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 600 }}>
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
                                  style={{
                                    transform: 'rotate(-90deg) translateX(-30px)',
                                    whiteSpace: 'nowrap',
                                    width: 40
                                  }}
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
                                home => {
                                  const squareInfo = squares[ `${home}-${away}` ];

                                  return (
                                    <Table.Cell
                                      textAlign="center"
                                      selectable={true}
                                      key={`${home}-${away}`}
                                      style={{ minWidth: 40, maxWidth: 80 }}
                                    >
                                      <Link to={`/bet/${home}-${away}`}>
                                        <LimitedWidthDiv>
                                          <strong>{home} - {away}</strong>
                                        </LimitedWidthDiv>
                                        <LimitedWidthDiv>
                                          {squareInfo.bets.length} <em>bet{squareInfo.bets.length !== 1 ? 's' : ''}</em>
                                        </LimitedWidthDiv>
                                        <LimitedWidthDiv>
                                          {
                                            numberDisplay(web3.fromWei(squareInfo.total, 'ether'))
                                          } <em>ETH</em>
                                        </LimitedWidthDiv>
                                      </Link>
                                    </Table.Cell>
                                  );
                                }
                              )
                          }
                        </Table.Row>
                      )
                    )
                }
              </Table.Body>
            </Table>
          </div>
        </div>
      );
    }
  }
);