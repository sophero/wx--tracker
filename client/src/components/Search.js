import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      inputAddress: '',
      formattedAddress: '',
      lat: '',
      lng: ''
    };

    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.getCoordsForInputAddress = this.getCoordsForInputAddress.bind(this);
    this.handleSaveWeather = this.handleSaveWeather.bind(this);
  }

  render() {
    return (
      <div>
        <div>{this.state.errorMsg}</div>
        <div>
          <p>
            Search by address/location or enter coordinates below.
          </p>
          <input
            type="text"
            onClick={e => e.target.select()}
            onChange={e => this.setState({ inputAddress: e.target.value })}
            onKeyUp={e => {if (e.key === "Enter") this.getCoordsForInputAddress()}}
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
          onChange={e => this.setState({ lat: e.target.value })}
          placeholder="Enter latitude"
        />
        <input
          type="text"
          value={this.state.lng}
          onChange={e => this.setState({ lng: e.target.value })}
          placeholder="Enter longitude"
        />
        <button onClick={this.getCurrentWeather}>Fetch weather</button>
      </div>
    );
  }

  getCoordsForInputAddress() {
    // let encodedAddress = encodeURIComponent(this.state.inputAddress);
    // if (encodedAddress === "") return;
    const address = this.state.inputAddress;
    if (address === "") return;
    // let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    axios.get(`/api/geocode/${address}`).then((res) => {
      // if (res.data.results.length === 0) {
      //   throw new Error('Unable to find address.');
      // }
      // let { location } = res.data.results[0].geometry;
      console.log('response from google api call to server:', res);
      
      const { lat, lng, formattedAddress } = res.data;
      this.setState({
        errorMsg: "",
        lat,
        lng,
        formattedAddress
      },
      this.getCurrentWeather);

    }).catch((err) => {
      if (err.code === 'ENOTFOUND') {
        this.setState({ errorMsg: 'Unable to connect to API server.' });
      } else {
        this.setState({ errorMsg: err.message })
      }
    });
  }

  handleSaveWeather() {
    this.props.saveWeather({
      location: {
        name: this.state.formattedAddress,
        formattedAddress: this.state.formattedAddress,
        lat: this.state.lat,
        lng: this.state.lng
      },
      wx: this.state.wx,
      time: this.state.time
    });
  }

  getCurrentWeather() {
    let lat = this.state.lat;
    let lng = this.state.lng;
    axios.get(`/api/current_weather/${lat}/${lng}`)
      .then(res => this.setState({
        wx: res.data.wx,
        time: res.data.time
      }, () => {
        this.handleSaveWeather();
      }))
      .catch(err => console.log(err));
  }
}

export default Search;
