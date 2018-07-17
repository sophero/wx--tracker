import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: '',
      lng: '',
      wx: {}
    };

    // bind this class instance to functions for use in this.setState etc.
    this.getCurWeather = this.getCurWeather.bind(this);
    this.updateLat = this.updateLat.bind(this);
    this.updateLng = this.updateLng.bind(this);
  }

  componentDidMount() {
    this.getCurWeather();
  }
  
  render() {
    console.log('App state:', this.state);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fetch us some wx oi</h1>
        </header>
        <div className="App-intro">
          <input
            type="text"
            value={this.state.lat}
            onChange={this.updateLat}
            placeholder="Enter latitude"
          />
          <input
            type="text"
            value={this.state.lng}
            onChange={this.updateLng}
            placeholder="Enter longitude"
          />
          <button onClick={this.getCurWeather}>Fetch weather</button>
          <div>
            <div>
              Time: {this.printTime(this.state.time)}
            </div>
            <div>
              Sunrise: {this.printTime(this.state.sunrise)}
            </div>
            <div>
              Sunset: {this.printTime(this.state.sunset)}
            </div>
            <div>
              Temperature: {this.state.wx.temp}
            </div>
            <div>
              Dewpoint: {this.state.wx.dewPoint}
            </div>
            <div>
              Pressure: {this.state.wx.pressure}
            </div>
            <div>
              Wind direction: {this.state.wx.windBearing}
            </div>
            <div>
              Wind speed: {this.state.wx.windSpeed}</div>
          </div>
        </div>
      </div>
    );
  }

  printTime(secs) {
    if (!secs) return '';
    return new Date(secs * 1000).toString(); // convert secs since 1970 to milliseconds
  }

  updateLat(event) {
    console.log('lat event:', event.target);
    this.setState({ lat: event.target.value })
  }

  updateLng(event) {
    console.log('lng event:', event.target);
    this.setState({ lng: event.target.value })
  }

  getCurWeather() {
    let lat = this.state.lat;
    let lng = this.state.lng;
    axios.get(`/api/currentWeather/${lat}/${lng}`)
      .then(res => this.setState({
        wx: res.data.wx,
        time: res.data.time,
        sunrise: res.data.sunrise,
        sunset: res.data.sunset
      }))
      .catch(err => console.log(err));
  }
}

export default App;
