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
      <div>
        <button className="table__msg table__header refresh-btn" onClick={this.props.refreshData}>Refresh data</button>
        <table className="wx-table">
        <thead>
          <tr>
            <th
              className="table__header"
              onClick={() => this.props.sortByLocation(false)}>
              Location
            </th>
            <th
              className="table__header"
              onClick={() => this.props.sortByHelper((elem) => elem.wx.temp, false)}>
              Temperature
            </th>
            <th
              className="table__header"
              onClick={() => this.props.sortByHelper((elem) => elem.wx.dewPoint, false)}>
              Dew point
            </th>
            <th
              className="table__header"
              onClick={() => this.props.sortByHelper((elem) => elem.wx.windBearing, false)} >
              Wind direction
            </th>
            <th
              className="table__header"
              onClick={() => this.props.sortByHelper((elem) => elem.wx.windSpeed, false)}>
              Wind speed
            </th>
            <th
              className="table__header"
              onClick={() => this.props.sortByHelper((elem) => elem.wx.dewPoint, false)}>
              Pressure
            </th>
          </tr>
        </thead>
        <tbody>
          {tableArr}
        </tbody>
      </table>
      <p className="table__msg">Click on a row to expand.</p>
    </div>
    );
  }

  selectRow(ind) {
    this.setState({ rowSelected: ind });
    this.props.selectRow(ind);
  }

}

export default Table;
