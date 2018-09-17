import React from 'react';

function TableRow(props) {
  if (props.ind === null) {
    return(
      <tr
        className={props.class}
        onClick={() => props.selectRow(props.ind)}>
        <td>{props.data.location.name}</td>
        <td>{props.data.wx.temp}</td>
        <td>{props.data.wx.dewPoint}</td>
        <td>{props.data.wx.windBearing}</td>
        <td>{props.data.wx.pressure}</td>
      </tr>
    )
  } else {
    return(
      <tr
        className={props.class}
        onClick={() => props.selectRow(props.ind)}>
        <td>{props.data.location.name}</td>
        <td>{props.data.wx.temp}</td>
        <td>{props.data.wx.dewPoint}</td>
        <td>{props.data.wx.windBearing}</td>
        <td>{props.data.wx.pressure}</td>
      </tr>
    );
  }
};

export default TableRow;