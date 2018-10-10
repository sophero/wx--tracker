import React from 'react';

function TableRow(props) {
  if (props.selected) {
    return(
      <div
        className="table__row table__row--selected"
        onClick={() => props.selectRow(null)}>
        <div className="table__row">
          <div className="table__data table__data--location">{props.data.location.name}</div>
          <div className="table__data">{props.data.wx.temp}</div>
          <div className="table__data">{props.data.wx.dewPoint}</div>
          <div className="table__data">{props.data.wx.windBearing}</div>
          <div className="table__data">{props.data.wx.windSpeed}</div>
          <div className="table__data">{props.data.wx.pressure}</div>
        </div>

        <div className="detail__container">
          <div className="detail__data">
            <span className="detail__data--label">Full Address</span>{props.data.location.formattedAddress}</div>
          <div className="detail__data detail__data--coords">
            <span className="detail__data--label">Latitude</span>
            {round(props.data.location.lat, 3)}
          </div>
          <div className="detail__data detail__data--coords">
            <span className="detail__data--label">Longitude</span>
            {round(props.data.location.lng, 3)}
          </div>
          <div className="detail__data detail__data--time">
            <span className="detail__data--label">Time Zone</span>{props.data.offset.timeZoneName}
          </div>
          <div className="detail__data detail__data--time">
            <span className="detail__data--label">Local time</span>{parseTime(props.data.offset.locTime)}
          </div>
          <div className="detail__data detail__data--time">
            <span className="detail__data--label">Local sunrise </span>{parseTime(props.data.offset.sunrise)}
          </div>
          <div className="detail__data detail__data--time">
            <span className="detail__data--label">Local sunset </span>{parseTime(props.data.offset.sunset)}
          </div>
        </div>
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

  function parseTime(secs) {
    let d = new Date(secs * 1000);
    let hrs = d.getHours().toString();
    let mins = d.getMinutes();
    if (mins < 10) {
        mins = "0" + mins.toString();
    }
    return hrs + ":" + mins;
  }

  function round(num, places) {
    let val = 10 ** places;
    return Math.round(num * val) / val;
  }
};

export default TableRow;