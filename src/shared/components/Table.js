import React from 'react';
import Table from 'react-bootstrap/lib/Table';

function createDataRows (props) {
  return props.rows.map((d, i) => {
    let dataObjectKeys = props.rows.length > 0 ? Object.keys(props.rows[0]) : Object.keys(d);
    let cells = dataObjectKeys.map((k, j) => {
      return (
        <td key={j}>
          {d[k]}
        </td>
      );
    });
    return (
      <tr key={i}>
        {cells}
      </tr>
    );
  });
}

export default class DataTable extends React.Component {

  render() {
      let heads = this.props.headers.map((d, i) => {
        return (
          <th key={i}>
            {d}
          </th>
        );
      });

      let rows = this.props.rows.length === 0 ? [[<tr><td>{'No Data Available'}</td></tr>]] : createDataRows(this.props);

      return (
        <Table data-component="table">
          <thead>
          <tr>
            {heads}
          </tr>
          </thead>

          <tbody>
            {rows}
          </tbody>
        </Table>
      );
  }
}

DataTable.defaultProps = {
  headers : ['Default 1', 'Default 2'],
  rows : [[3 , 4], [5 , 6], [7 , 8]],
};
