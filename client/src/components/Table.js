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
    console.log('row selected:', this.state.rowSelected);
    
    const tableArr = this.props.data.map((loc, ind) => {
      if (ind === this.state.rowSelected) {
        return <TableRow
          data={loc}
          key={ind}
          ind={null}
          class="row row-selected"
          selectRow={this.selectRow} />
      } else {
        return <TableRow
          data={loc}
          key={ind}
          ind={ind}
          class="row"
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
  }
}

export default Table;
