import React, { Component } from 'react';
import axios from 'axios';
import '../css/Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      inputAddress: '',
      address: '',
      lat: '',
      lng: '',
      searchByAddress: true
    };
    this.locInput = React.createRef();
    this.latInput = React.createRef();

    this.searchByCoords = this.searchByCoords.bind(this);
    this.showLoadingMsg = this.showLoadingMsg.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
    this.focusLocInput = this.focusLocInput.bind(this);
    this.focusLatInput = this.focusLatInput.bind(this);
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.getCoordsFromInputAddress = this.getCoordsFromInputAddress.bind(this);
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
            onKeyUp={e => {if (e.key === "Enter") this.getCoordsFromInputAddress()}}
            value={this.state.inputAddress}
            placeholder="Enter address/location"
          />
          <div>
            <button className="search__button" onClick={this.getCoordsFromInputAddress}>Search</button>
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
          value={this.state.address}
          onChange={e => this.setState({ address: e.target.value })}
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
        {searchContainer}
        <div className="search__msg">{this.state.message}</div>
      </div>
    );
  }

  async getCoordsFromInputAddress() {
    this.showLoadingMsg();
    try {
      const name = this.state.inputAddress;
      if (name === "") return;

      const res = await axios.get(`/api/geocode/${name}`);
      const { lat, lng, address } = res.data;
      this.getCurrentWeather({
        lat,
        lng,
        address,
        name: address
      });

    } catch(err) {
      console.log(err);
      this.setState({ message: err.data.errorMsg });
    }
  }

  searchByCoords() {
    this.showLoadingMsg();
    const { lat, lng, address } = this.state;
    this.getCurrentWeather({
      lat,
      lng,
      address: 'Unknown',
      name: address
    });
  }

  calcUserOffset() {
    // obtain user's timezone offset from date string
    const d = new Date();
    let userOffset = parseInt(d.toString().split(' ')[5].substr(3), 10);

    // convert "-0800" -> -800 hrmin format to seconds, accounting for non-hour time zones
    const rem = userOffset % 100; // note that rem is neg for neg userOffset, so non-hour offsets are accounted for for both positive and negative offsets.
    if (rem === 0) {
      userOffset *= 36;
    } else {
      userOffset = (userOffset - rem) * 36 + rem;
    }

    return userOffset;
  }

  async getCurrentWeather({ lat, lng, address, name }) {
    try {
      const wxRes = await axios.get(`/api/current_weather/${lat}/${lng}`);
      const timeRes = await axios.get(`/api/timezone_offset/${lat}/${lng}/${wxRes.data.time.wxTime}`);

      const adjustment = timeRes.data.offset - this.calcUserOffset();

      const { wxTime, sunrise, sunset } = wxRes.data.time;
      const locTime = wxTime + adjustment;
      const locSunrise = sunrise + adjustment;
      const locSunset = sunset + adjustment;

      this.props.saveWeather({
        location: { lat, lng, address, name },
        wx: wxRes.data.wx,
        time: wxRes.data.time,
        offset: {
          locTime: locTime,
          timeZoneName: timeRes.data.timeZoneName,
          sunrise: locSunrise,
          sunset: locSunset
        }
      },
      this.clearMessage);

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

  showLoadingMsg() {
    this.setState({ message: 'Loading...' });
  }

  clearMessage() {
    this.setState({ message: '' });
  }
}

export default Search;
