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
        // this.rowSelectedRef = React.createRef();
        return <TableRow
          className="table__row table__row--selected"
          // ref={this.rowSelectedRef}
          data={data}
          key={ind}
          ind={ind}
          selected={true}
          selectRow={this.selectRow}
          removeRow={this.props.removeRow} />
      } else {
        return <TableRow
          className="table__row"
          data={data}
          key={ind}
          ind={ind}
          selected={false}
          selectRow={this.selectRow} />
      }
    });

    let expandMsg;
    if (this.state.rowSelected === null) {
      expandMsg = <p className="table__msg">Click on a row to view details.</p>
    }

    return(
      <div className="table__container">
        <button className="table__msg table__refresh-btn" onClick={this.props.refreshData}>Refresh data</button>
        <div className="table__row table__headers">
          <div
            className="table__header table__header--location"
            onClick={() => this.props.sortByLocation(false)}>
            Location
          </div>
          <div
            className="table__header"
            onClick={() => this.props.sortByHelper((elem) => elem.wx.temp, false)}>
            Temperature
          </div>
          <div
            className="table__header"
            onClick={() => this.props.sortByHelper((elem) => elem.wx.dewPoint, false)}>
            Dew point
          </div>
          <div
            className="table__header"
            onClick={() => this.props.sortByHelper((elem) => elem.wx.windBearing, false)} >
            Wind direction
          </div>
          <div
            className="table__header"
            onClick={() => this.props.sortByHelper((elem) => elem.wx.windSpeed, false)}>
            Wind speed
          </div>
          <div
            className="table__header"
            onClick={() => this.props.sortByHelper((elem) => elem.wx.dewPoint, false)}>
            Pressure
          </div>
        </div>
        {tableArr}
        {expandMsg}
      </div>
    );
  }

  selectRow(ind) {
    this.setState({ rowSelected: ind });
    this.props.selectRow(ind);
  }

}

export default Table;
