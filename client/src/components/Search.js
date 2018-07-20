import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      inputAddress: '',
      errorMsg: '',
      lat: '',
      lng: ''
    };

    // bind this class instance to all functions with this.setState call
    this.getCurWeather = this.getCurWeather.bind(this);
    this.getCoordsForInputAddress = this.getCoordsForInputAddress.bind(this);
  }

  render() {
    console.log('Search state:', this.state);

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
  handleSaveLocation() {
    this.props.saveLocation({
        lat: this.state.lat,
        lng: this.state.lng,
        address: this.state.address
    });
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

export default Search;
