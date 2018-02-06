import * as React from 'react';
import { AllHTMLAttributes } from 'react';
import * as _ from 'underscore';
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { AppState } from '../util/configureStore';
import { SquareInfo, SquareInfoMap } from '../reducers/betsReducers';
import { web3 } from '../contracts';
import numberDisplay from '../util/numberDisplay';
import { Link } from 'react-router-dom';
import { SquareWinsMap } from '../reducers/votesReducer';

function NoWrapDiv(props: AllHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        ...props.style,
        whiteSpace: 'nowrap'
      }}
    />
  );
}

interface CellComponentProps {
  home: string;
  away: string;
  squareInfo: SquareInfo
  squareWins?: string;
}

export function GridCellComponent({ home, away, squareInfo: { bets, total }, squareWins }: CellComponentProps) {
  return (
    <Link
      to={`/bet/${home}-${away}`}
      style={{ backgroundColor: squareWins && +squareWins > 0 ? 'limegreen' : null }}
    >
      <NoWrapDiv>
        <strong>{home} - {away}</strong>
      </NoWrapDiv>
      <NoWrapDiv>
        {bets.length} <em>bet{bets.length !== 1 ? 's' : ''}</em>
      </NoWrapDiv>
      <NoWrapDiv>
        {
          numberDisplay(web3.fromWei(total, 'ether'))
        } <em>ETH</em>
      </NoWrapDiv>
      <NoWrapDiv>
        {squareWins && +squareWins > 0 ? `${squareWins} win(s)` : ''}
      </NoWrapDiv>
    </Link>
  );
}

interface GridProps<T extends CellComponentProps> {
  squares: SquareInfoMap;
  cellComponent: React.ComponentType<T>;
  squareWins: SquareWinsMap;
}

export default connect(
  ({ bets: { squares }, votes: { accepted, finalized, squareWins, votingPeriodStartTime } }: AppState) => ({
    squares,
    squareWins
  })
)(
  class Grid<T extends CellComponentProps> extends React.Component<GridProps<T>> {
    render() {
      const { squares, cellComponent: CellComponent, squareWins } = this.props;

      return (
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 600 }}>
            <Table unstackable={true} celled={true}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell rowSpan={2} colSpan={2}/>
                  <Table.HeaderCell textAlign="center" colSpan={10}>Philadelphia team
                    score</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  {
                    _.range(0, 10)
                      .map(
                        home => (
                          <Table.HeaderCell
                            textAlign="center"
                            key={home}
                          >
                            {home}
                          </Table.HeaderCell>
                        )
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
                                    whiteSpace: 'nowrap',
                                    width: 40
                                  }}
                                >
                                  New England team score
                                </div>
                              </Table.HeaderCell>
                            ) : null
                          }
                          <Table.HeaderCell
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
                                    >
                                      <CellComponent
                                        home={'' + home}
                                        away={'' + away}
                                        squareWins={squareWins[ `${home}-${away}` ]}
                                        squareInfo={squareInfo}
                                      />
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
