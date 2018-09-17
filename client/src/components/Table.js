import React, { Component } from 'react';
import TableRow from './TableRow';
import '../css/Table.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowSelected: null
    }
    this.selectRow = this.selectRow.bind(this);
  }

  render() { 
    const tableArr = this.props.data.map((data, ind) => {
      if (ind === this.state.rowSelected) {
        return <TableRow
          data={data}
          key={ind}
          ind={ind}
          selected={true}
          selectRow={this.selectRow}
          removeRow={this.props.removeRow} />
      } else {
        return <TableRow
          data={data}
          key={ind}
          ind={ind}
          selected={false}
          selectRow={this.selectRow} />
      }
    });

    return(
      <table className="wx-table">
      <thead>
        <tr>
          <th>Location</th>
          <th>Temperature</th>
          <th>Dew point</th>
          <th>Wind</th>
          <th>Pressure</th>
        </tr>
      </thead>
      <tbody>
        {tableArr}
      </tbody>
    </table>
    );
  }

  selectRow(ind) {
    this.setState({ rowSelected: ind });
    this.props.selectRow(ind);
  }
}

export default Table;
