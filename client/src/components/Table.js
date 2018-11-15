import React from 'react';
import TableRow from './TableRow';
import '../css/Table.css';

function Table(props) {
  const tableArr = props.data.map((data, ind) => {
    if (ind === props.rowSelected) {
      return <TableRow
        className="table__row--selected"
        data={data}
        key={ind}
        ind={ind}
        selected={true}
        editName={props.editName}
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
        editName={props.editName}
        selected={false}
        selectRow={props.selectRow}
        units={props.units}
      />
    }
  });

  let message;
  if (props.rowSelected === null) {
    message = <p className="table__msg">Click on a row to view more details.</p>
  } else {
    message = <p className="table__msg">Click on location name to edit. Hit Enter to save.</p>
  }

  let toggleUnitsMsg = 'Use metric units';
  if (props.units.temp === 'C') toggleUnitsMsg = 'Use imperial units';

  let headers;
  if (props.width < 614) {
    headers = [ 'Location', 'T', 'Td', 'Wd', 'Ws', 'P'];
  } else {
    headers = [ 'Location', 'Temperature', 'Dew point', 'Wind direction', 'Wind speed', 'Pressure'];
  }


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
          {headers[0]}
        </div>
        <div
          className="table__header"
          onClick={() => props.sortByHelper((elem) => elem.wx.temp, false)}>
          {headers[1]}
        </div>
        <div
          className="table__header"
          onClick={() => props.sortByHelper((elem) => elem.wx.dewPoint, false)}>
          {headers[2]}
        </div>
        <div
          className="table__header"
          onClick={() => props.sortByHelper((elem) => elem.wx.windBearing, false)} >
          {headers[3]}
        </div>
        <div
          className="table__header"
          onClick={() => props.sortByHelper((elem) => elem.wx.windSpeed, false)}>
          {headers[4]}
        </div>
        <div
          className="table__header"
          onClick={() => props.sortByHelper((elem) => elem.wx.pressure, false)}>
          {headers[5]}
        </div>
      </div>
      {tableArr}
      {message}
    </div>
  );
}

export default Table;
