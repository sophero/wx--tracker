import React from 'react';

function TableRow(props) {
  console.log('TableRow props:', this.props);
  let sunrise, sunset;
  if (this.props.time.sunrise) {
    sunrise = printTime(this.props.time.sunrise).split(' ')[4];
  }
  if (this.props.time.sunset) {
    sunset = printTime(this.props.time.sunset).split(' ')[4];
  }
  console.log(sunrise, sunset);

  return(
    <div>
      Time: {printTime(this.props.time.wxTime)}
      Sunrise: {sunrise}
      Sunset: {sunset}
      Temperature: {this.props.wx.temp}
      Dewpoint: {this.props.wx.dewPoint}
      Pressure: {this.props.wx.pressure}
      Wind direction: {this.props.wx.windBearing}
      Wind speed: {this.props.wx.windSpeed}
    </div>
  );

  function printTime(secs) {
    if (!secs) return '';
    return new Date(secs * 1000).toString(); // convert secs to milliseconds
  }
};

export default TableRow;