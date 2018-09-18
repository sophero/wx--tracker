import React from 'react';

function TableRow(props) {
  if (props.selected) {
    return(
      <tr
        className="row row-selected"
        onClick={() => props.selectRow(null)}>
        <td>{props.data.location.name}</td>
        <td>{props.data.wx.temp}</td>
        <td>{props.data.wx.dewPoint}</td>
        <td>{props.data.wx.windBearing}</td>
        <td>{props.data.wx.windSpeed}</td>
        <td>{props.data.wx.pressure}</td>
      </tr>
    )
  } else {
    return(
      <tr
        className="row"
        onClick={() => props.selectRow(props.ind)}>
        <td>{props.data.location.name}</td>
        <td>{props.data.wx.temp}</td>
        <td>{props.data.wx.dewPoint}</td>
        <td>{props.data.wx.windBearing}</td>
        <td>{props.data.wx.windSpeed}</td>
        <td>{props.data.wx.pressure}</td>
      </tr>
    );
  }
};

export default TableRow;