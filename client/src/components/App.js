import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      address: '',
      inputAddress: '',
      errorMsg: '',
      lat: '',
      lng: '',
      wx: {},
      time: {}
    };

    // bind this class instance to all functions with this.setState call
    this.getCurWeather = this.getCurWeather.bind(this);
    this.getCoordsForInputAddress = this.getCoordsForInputAddress.bind(this);
  }

  render() {
    console.log('App state:', this.state);
    let sunrise, sunset;
    if (this.state.time.sunrise) {
      sunrise = this.printTime(this.state.time.sunrise).split(' ')[4];
    }
    if (this.state.time.sunset) {
      sunset = this.printTime(this.state.time.sunset).split(' ')[4];
    }
    console.log(sunrise, sunset);


    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fetch us some wx oi</h1>
        </header>
        <div className="App-intro">
          <div>{this.state.errorMsg}</div>
          <div>
            <input
              type="text"
              onClick={(e) => e.target.select()}
              onChange={(e) => this.setState({ inputAddress: e.target.value })}
              value={this.state.inputAddress}
              placeholder="Enter address/location"
            />
            <div>
              <button onClick={this.getCoordsForInputAddress}>Search</button>
            </div>
          </div>
          <input
            type="text"
            value={this.state.lat}
            onChange={(e) => this.setState({ lat: e.target.value })}
            placeholder="Enter latitude"
          />
          <input
            type="text"
            value={this.state.lng}
            onChange={(e) => this.setState({ lng: e.target.value })}
            placeholder="Enter longitude"
          />
          <button onClick={this.getCurWeather}>Fetch weather</button>
          <div>
            <div>
              Time: {this.printTime(this.state.time.wxTime)}
            </div>
            <div>
              Sunrise: {sunrise}
            </div>
            <div>
              Sunset: {sunset}
            </div>
          </div>
          <div style={{marginTop: '10px'}}>
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

  getCoordsForInputAddress() {
    let encodedAddress = encodeURIComponent(this.state.inputAddress);
    if (encodedAddress === "") {
      return;
    }
    let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    axios.get(geocodeUrl).then((res) => {
      if (res.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address.');
      }

      let { location } = res.data.results[0].geometry;
      console.log(location);
      console.log(res.data.results[0].formatted_address);
      this.setState({
        errorMsg: "",
        lat: location.lat,
        lng: location.lng,
        address: res.data.results[0].formatted_address
      },
      this.getCurWeather);

    }).catch((err) => {
      if (err.code === 'ENOTFOUND') {
        this.setState({ errorMsg: 'Unable to connect to API servers.' });
      } else {
        this.setState({ errorMsg: err.message })
      }
    });
  }

  // // pass down to a prop to a geolocation/search location component, eh?
  // handleSetCoords() {
  //   this.props.setCoords({
  //       lat: this.state.lat,
  //       lng: this.state.lng,
  //       address: this.state.address
  //   });
  // }

  printTime(secs) {
    if (!secs) return '';
    return new Date(secs * 1000).toString(); // convert secs to milliseconds
  }

  getCurWeather() {
    let lat = this.state.lat;
    let lng = this.state.lng;
    axios.get(`/api/currentWeather/${lat}/${lng}`)
      .then(res => this.setState({
        wx: res.data.wx,
        time: res.data.time
      }))
      .catch(err => console.log(err));
  }
}

export default App;
