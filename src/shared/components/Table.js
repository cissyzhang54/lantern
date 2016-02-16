import React from 'react';
import Table from 'react-bootstrap/lib/Table';


export default class DataTable extends React.Component {

  createDataRows() {
    let rows = this.props.rows;

    if (!rows.length) {
      return [[<tr key={0}><td>{'No Data Available'}</td></tr>]];
    }

    return rows.map((d, i) => {
      let dataObjectKeys = rows.length > 0 ? Object.keys(rows[0]) : Object.keys(d);
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

  handleHeaderClick(name, key) {
    // only sort from second header onwards
    if (key)
      this.props.onHeaderClick(name, key-1);
  }

  render() {
    let heads = this.props.headers.map((d, i) => {
      const handler = this.handleHeaderClick.bind(this, d, i);
      const style = {};
      if (this.props.sortable && i) {
        style.cursor = 'pointer'
      }
      return (
        <th key={i}
          style={style}
          onClick={this.props.sortable ? handler : null}
        >
          {d}
        </th>
      );
    });

    let rows = this.createDataRows();

    return (
      <Table
        responsive
        condensed
        data-component="table"
      >
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
  onHeaderClick: () => {},
  rows : [[3 , 4], [5 , 6], [7 , 8]]
};
