import * as React from 'react';
import { AllHTMLAttributes } from 'react';
import * as _ from 'underscore';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import { connect } from 'react-redux';
import { AppState } from '../util/configureStore';
import { SquareInfo, SquareInfoMap } from '../reducers/betsReducers';
import { web3 } from '../contracts';
import numberDisplay from '../util/numberDisplay';
import { Link } from 'react-router-dom';

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

interface CellComponentProps {
  home: string;
  away: string;
  squareInfo: SquareInfo
}

export function GridCellComponent({ home, away, squareInfo: { bets, total } }: CellComponentProps) {
  return (
    <Link to={`/bet/${home}-${away}`}>
      <LimitedWidthDiv>
        <strong>{home} - {away}</strong>
      </LimitedWidthDiv>
      <LimitedWidthDiv>
        {bets.length} <em>bet{bets.length !== 1 ? 's' : ''}</em>
      </LimitedWidthDiv>
      <LimitedWidthDiv>
        {
          numberDisplay(web3.fromWei(total, 'ether'))
        } <em>ETH</em>
      </LimitedWidthDiv>
    </Link>
  );
}

interface Props<T extends CellComponentProps> {
  squares: SquareInfoMap,
  cellComponent: React.ComponentType<T>
}

export default connect(
  ({ bets: { squares } }: AppState) => ({ squares })
)(
  class Grid<T extends CellComponentProps> extends React.Component<Props<T>> {
    render() {
      const { squares, cellComponent: CellComponent } = this.props;

      return (
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 600 }}>
            <Table unstackable={true} celled={true} fixed={true}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell rowSpan={2} colSpan={2}/>
                  <Table.HeaderCell textAlign="center" colSpan={10}>Philadelphia team score</Table.HeaderCell>
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
                              >
                                <div
                                  style={{
                                    transform: 'rotate(-90deg) translateX(-30px)',
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  New England team score
                                </div>
                              </Table.HeaderCell>
                            ) : null
                          }
                          <Table.HeaderCell
                            celled={true}
                            style={{ minWidth: '2em', textAlign: 'center' }}
                          >
                            {away}
                          </Table.HeaderCell>
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
                                      <CellComponent home={'' + home} away={'' + away} squareInfo={squareInfo}/>
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