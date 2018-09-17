import React, { Component } from 'react';
import axios from 'axios';
import '../css/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: '',
      inputAddress: '',
      formattedAddress: '',
      lat: '',
      lng: '',
      searchByAddress: true
    };
    this.locInput = React.createRef();
    this.latInput = React.createRef();

    this.focusLocInput = this.focusLocInput.bind(this);
    this.focusLatInput = this.focusLatInput.bind(this);
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.getCoordsForInputAddress = this.getCoordsForInputAddress.bind(this);
    this.handleSaveWeather = this.handleSaveWeather.bind(this);
  }

  componentDidMount() {
    this.focusLocInput();
  }

  render() {
    let searchContainer;
    let [ addressNavElemClassName, coordsNavElemClassName ] = [ "search-nav__element", "search-nav__element" ];

    if (this.state.searchByAddress) {
      addressNavElemClassName += " search-nav__element--selected";

      searchContainer = 
        <div className="search__container--sub">
          <h2>
            Search by location/address
          </h2>
          <input
            ref={this.locInput}
            type="text"
            onClick={e => e.target.select()}
            onChange={e => this.setState({ inputAddress: e.target.value })}
            onKeyUp={e => {if (e.key === "Enter") this.getCoordsForInputAddress()}}
            value={this.state.inputAddress}
            placeholder="Enter address/location"
          />
          <div>
            <button className="search__button" onClick={this.getCoordsForInputAddress}>Search</button>
          </div>
        </div>

    } else {

      coordsNavElemClassName += " search-nav__element--selected";

      searchContainer =
      <div className="search__container--sub">
        <h2>
          Search by coordinates
        </h2>
        <input
          ref={this.latInput}
          type="text"
          value={this.state.lat}
          onChange={e => this.setState({ lat: e.target.value })}
          onClick={e => e.target.select()}
          placeholder="Enter latitude"
        />
        <input
          type="text"
          value={this.state.lng}
          onChange={e => this.setState({ lng: e.target.value })}
          onClick={e => e.target.select()}
          placeholder="Enter longitude"
        />
        <input
          type="text"
          value={this.state.formattedAddress}
          onChange={e => this.setState({ formattedAddress: e.target.value })}
          onClick={e => e.target.select()}
          onKeyUp={e => {if (e.key === "Enter") this.getCurrentWeather()}}
          placeholder="Enter a name for this location"
          />
        <div>
          <button className="search__button" onClick={this.getCurrentWeather}>Search</button>
        </div>
      </div>
    }

    return (
      <div className="search__container">
        <div className="search-nav__container">
          <div
            className={addressNavElemClassName}
            onClick={() => this.setState({ searchByAddress: true }, this.focusLocInput)}>
            Search by location/address
          </div>
          <div
            className={coordsNavElemClassName}
            onClick={() => this.setState({ searchByAddress: false }, this.focusLatInput)}>
            Search by coordinates
          </div>
        </div>
        <div>{this.state.errorMsg}</div>
        {searchContainer}
      </div>
    );
  }

  getCoordsForInputAddress() {
    const address = this.state.inputAddress;
    if (address === "") return;

    axios.get(`/api/geocode/${address}`).then((res) => {
      const { lat, lng, formattedAddress } = res.data;
      this.setState({
        errorMsg: "",
        lat,
        lng,
        formattedAddress
      },
      this.getCurrentWeather)

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
      },
      this.handleSaveWeather))
      .catch(err => console.log(err));
  }

  focusLocInput() {
    this.locInput.current.focus();
  }

  focusLatInput() {
    this.latInput.current.focus();
  }
}

export default Search;
