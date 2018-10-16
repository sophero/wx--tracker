import React from 'react';
import TableRow from './TableRow';
import '../css/Table.css';

function Table(props) {
  const tableArr = props.data.map((data, ind) => {
    if (ind === props.rowSelected) {
      return <TableRow
        className="table__row table__row--selected"
        data={data}
        key={ind}
        ind={ind}
        selected={true}
        selectRow={props.selectRow}
        removeRow={props.removeRow}
        units={props.units}
      />
    } else {
      return <TableRow
        className="table__row"
        data={data}
        key={ind}
        ind={ind}
        selected={false}
        selectRow={props.selectRow}
        units={props.units}
      />
    }
  });

  let expandMsg;
  if (props.rowSelected === null) {
    expandMsg = <p className="table__msg">Click on a row to view details.</p>
  }

  let toggleUnitsMsg = 'Use metric units';
  if (props.units.temp === 'C') toggleUnitsMsg = 'Use imperial units';

  return(
    <div className="table__container">
      <div className="table__btn--container">
        <button className="table__btn" onClick={props.refreshData}>Refresh data</button>
        <button className="table__btn" onClick={props.toggleUnits}>{toggleUnitsMsg}</button>
      </div>

      <div className="table__row table__headers">
        <div
          className="table__header table__header--location"
          onClick={() => props.sortByLocation(false)}>
          Location
        </div>
        <div
          className="table__header"
          onClick={() => props.sortByHelper((elem) => elem.wx.temp, false)}>
          Temperature
        </div>
        <div
          className="table__header"
          onClick={() => props.sortByHelper((elem) => elem.wx.dewPoint, false)}>
          Dew point
        </div>
        <div
          className="table__header"
          onClick={() => props.sortByHelper((elem) => elem.wx.windBearing, false)} >
          Wind direction
        </div>
        <div
          className="table__header"
          onClick={() => props.sortByHelper((elem) => elem.wx.windSpeed, false)}>
          Wind speed
        </div>
        <div
          className="table__header"
          onClick={() => props.sortByHelper((elem) => elem.wx.dewPoint, false)}>
          Pressure
        </div>
      </div>
      {tableArr}
      {expandMsg}
    </div>
  );
}

export default Table;
