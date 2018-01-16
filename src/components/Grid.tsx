import './Grid.css';
import * as React from 'react';
import * as _ from 'underscore';

export default class Grid extends React.Component<{}> {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-striped ">
          <thead>
          <tr>
            <th style={{ width: 100 }}/>
            <th className="text-center" colSpan={10}>Home Team score</th>
          </tr>
          <tr>
            <th className="text-right" rowSpan={10}>Away Team scoreAway Team scoreAway Team score</th>
            {
              _.range(0, 10)
                .map(
                  home => <th className="text-center" key={home}>{home}</th>
                )
            }
          </tr>
          </thead>
          <tbody>
          {
            _.range(0, 10)
              .map(
                away => (
                  <tr key={away}>
                    <th />
                    <th className="text-right">{away}</th>
                    {
                      _.range(0, 10)
                        .map(
                          home => (
                            <td className="text-center grid-box" key={`${home},${away}`}>
                              No bets
                            </td>
                          )
                        )
                    }
                  </tr>
                )
              )
          }
          </tbody>
        </table>
      </div>
    );
  }
}