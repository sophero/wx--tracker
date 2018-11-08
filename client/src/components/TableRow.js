import React from 'react';

function TableRow(props) {
  if (props.selected) {
    return(
      <div
        className="table__row table__row--selected"
        onClick={() => props.selectRow(null)}>
        <div className="table__row">
          <div className="table__data table__data--location">{props.data.location.name}</div>
          <div className="table__data">{displayTemp(props.data.wx.temp)}</div>
          <div className="table__data">{displayTemp(props.data.wx.dewPoint)}</div>
          <div className="table__data">{windDirection(props.data.wx.windBearing)}</div>
          <div className="table__data">{displayWindSpeed(props.data.wx.windSpeed)}</div>
          <div className="table__data">{round(props.data.wx.pressure, 1)} hPa</div>
        </div>

        <div className="detail__container">
          <div className="detail__data">
            <span className="detail__data--label">Address</span>{props.data.location.address}</div>
          <div className="detail__data detail__data--coords">
            <span className="detail__data--label">Latitude</span>
            {displayCoords(props.data.location.lat, 'LAT')}
          </div>
          <div className="detail__data detail__data--coords">
            <span className="detail__data--label">Longitude</span>
            {displayCoords(props.data.location.lng, 'LNG')}
          </div>

          {displayTimes()}
        </div>
      </div>
    )
  } else {
    return(
      <div
        className="table__row"
        onClick={() => props.selectRow(props.ind)}>
        <div className="table__data table__data--location">{props.data.location.name}</div>
        <div className="table__data">{displayTemp(props.data.wx.temp)}</div>
        <div className="table__data">{displayTemp(props.data.wx.dewPoint)}</div>
        <div className="table__data">{windDirection(props.data.wx.windBearing)}</div>
        <div className="table__data">{displayWindSpeed(props.data.wx.windSpeed)}</div>
        <div className="table__data">{round(props.data.wx.pressure, 1)} hPa</div>
      </div>
    );
  }

  function displayCoords(angle, type) {
    const neg = angle < 0;
    let angleArr = round(angle, 3).toString().split('');
    let dir = '';
    if (type === 'LAT') {
      dir = neg ? 'S' : 'N';
    } else if (type === 'LNG') {
      dir = neg ? 'W' : 'E';
    }
    if (neg && (type === 'LAT' || type === 'LNG')) angleArr.shift(); // remove negative sign
    return `${angleArr.join('')}${String.fromCharCode(176)}${dir}`;
  }

  function displayTemp(fahrenheit) {
    const unit = props.units.temp;
    let temp = fahrenheit;
    if (unit === 'C') temp = fahrenheitToCelsius(fahrenheit);
    return `${round(temp, 1)}${String.fromCharCode(176)}${unit}`;
  }

  function displayTimes() {
    if (!props.data.offset.timeZoneName) {
      return "";
    } else {
      return(
        <div className="detail__time--container">
          <div className="detail__data detail__data--time">
            <span className="detail__data--label">Time Zone</span>{props.data.offset.timeZoneName}
          </div>
          <div className="detail__data detail__data--time">
            <span className="detail__data--label">Sunrise </span>{parseTime(props.data.offset.sunrise)}
          </div>
          <div className="detail__data detail__data--time">
            <span className="detail__data--label">Local time</span>{parseTime(props.data.offset.locTime)}
          </div>
          <div className="detail__data detail__data--time">
            <span className="detail__data--label">Sunset </span>{parseTime(props.data.offset.sunset)}
          </div>
        </div>
      );
    }
  }

  function displayWindSpeed(mph) {
    const units = props.units.wind;
    let speed = mph;
    if (units === 'kph') speed = mphToKph(mph);
    return `${round(speed, 1)} ${units}`;
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

  function fahrenheitToCelsius(f) {
    let c = (f - 32) * 5 / 9;
    return (Math.round(c * 100) / 100);
  }

  function windDirection(b) {
    const strArray = [
      "N",
      "NNW",
      "NW",
      "WNW",
      "W",
      "WSW",
      "SW",
      "SSW",
      "S",
      "ESE",
      "SE",
      "ESE",
      "E",
      "ENE",
      "NE",
      "NNE",
      "N"
    ];
    for (let k = 0; k < 17; k++) {
      let dir = 360 - (360 / 32) - k * (360 / 16);
      if (b > dir) {
        return strArray[k];
      }
    }
  }

  function mphToKph(mph) {
    let kph = mph * 1.609344;
    return (Math.round(kph * 100) / 100);
  }
};

export default TableRow;