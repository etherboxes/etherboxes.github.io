import * as React from 'react';
import * as _ from 'underscore';

export default class Grid extends React.Component<{}> {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-striped ">
          <thead>
          <tr>
            <th/>
            <th className="text-center" colSpan={10}>Home Team score</th>
          </tr>
          <tr>
            <th className="text-center">Away Team score</th>
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
                    <th style={{ textAlign: 'center' }}>{away}</th>
                    {
                      _.range(0, 10)
                        .map(
                          home => (
                            <td style={{ textAlign: 'center' }} className="hover-box" key={`${home},${away}`}>
                              {home}, {away}
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