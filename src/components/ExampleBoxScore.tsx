import * as React from 'react';

export default class ExampleBoxScore extends React.Component {
  render() {
    return (
      <table className="table table-bordered">
        <thead>
        <tr>
          <th>Team</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>OT</th>
          <th>Final</th>
        </tr>
        </thead>

        <tbody>
        <tr>
          <td><strong>Atlanta</strong> (Home)</td>
          <td>0</td>
          <td>21</td>
          <td>7</td>
          <td>0</td>
          <td>0</td>
          <td>28</td>
        </tr>

        <tr>
          <td><strong>New England</strong> (Away)</td>
          <td>0</td>
          <td>3</td>
          <td>6</td>
          <td>19</td>
          <td>6</td>
          <td>34</td>
        </tr>
        </tbody>
      </table>
    );
  }
}