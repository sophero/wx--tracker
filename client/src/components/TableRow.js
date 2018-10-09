import React from 'react';

function TableRow(props) {
  if (props.selected) {
    return(
      <div
        className="table__row table__row--selected"
        onClick={() => props.selectRow(null)}>
        <div className="table__data table__data--location">{props.data.location.name}</div>
        <div className="table__data">{props.data.wx.temp}</div>
        <div className="table__data">{props.data.wx.dewPoint}</div>
        <div className="table__data">{props.data.wx.windBearing}</div>
        <div className="table__data">{props.data.wx.windSpeed}</div>
        <div className="table__data">{props.data.wx.pressure}</div>
      </div>
    )
  } else {
    return(
      <div
        className="table__row"
        onClick={() => props.selectRow(props.ind)}>
        <div className="table__data table__data--location">{props.data.location.name}</div>
        <div className="table__data">{props.data.wx.temp}</div>
        <div className="table__data">{props.data.wx.dewPoint}</div>
        <div className="table__data">{props.data.wx.windBearing}</div>
        <div className="table__data">{props.data.wx.windSpeed}</div>
        <div className="table__data">{props.data.wx.pressure}</div>
      </div>
    );
  }
};

export default TableRow;