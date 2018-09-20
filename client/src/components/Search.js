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

    this.searchByCoords = this.searchByCoords.bind(this);
    this.focusLocInput = this.focusLocInput.bind(this);
    this.focusLatInput = this.focusLatInput.bind(this);
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.getCoordsForInputAddress = this.getCoordsForInputAddress.bind(this);
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
          onKeyUp={e => {if (e.key === "Enter") this.searchByCoords()}}
          placeholder="Enter latitude"
        />
        <input
          type="text"
          value={this.state.lng}
          onChange={e => this.setState({ lng: e.target.value })}
          onClick={e => e.target.select()}
          onKeyUp={e => {if (e.key === "Enter") this.searchByCoords()}}
          placeholder="Enter longitude"
        />
        <input
          type="text"
          value={this.state.formattedAddress}
          onChange={e => this.setState({ formattedAddress: e.target.value })}
          onClick={e => e.target.select()}
          onKeyUp={e => {if (e.key === "Enter") this.searchByCoords()}}
          placeholder="Enter a name for this location"
          />
        <div>
          <button className="search__button" onClick={this.searchByCoords}>Search</button>
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

  async getCoordsForInputAddress() {
    try {
      const address = this.state.inputAddress;
      if (address === "") return;

      const res = await axios.get(`/api/geocode/${address}`);
      const { lat, lng, formattedAddress } = res.data;
      this.getCurrentWeather({
        lat,
        lng,
        formattedAddress,
        name: formattedAddress
      });

    } catch(err) {
      console.log(err);
      this.setState({ errorMsg: err.message });
    }
  }

  searchByCoords() {
    const { lat, lng, formattedAddress } = this.state;
    this.getCurrentWeather({
      lat,
      lng,
      formattedAddress,
      name: formattedAddress
    });
  }

  async getCurrentWeather({ lat, lng, formattedAddress, name }) {
    try {
      const res = await axios.get(`/api/current_weather/${lat}/${lng}`);
      console.log('wx res:', res);
      this.props.saveWeather({
        location: { lat, lng, formattedAddress, name },
        wx: res.data.wx,
        time: res.data.time
      })
    } catch(err) {
      console.log(err);
    }
  }

  focusLocInput() {
    this.locInput.current.focus();
  }

  focusLatInput() {
    this.latInput.current.focus();
  }
}

export default Search;
