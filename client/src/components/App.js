import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';
import Search from './Search';

class App extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      wx: {}
    };

    this.saveLocation = this.saveLocation.bind(this);
    this.saveWeather = this.saveWeather.bind(this);
  }

  render() {
    console.log('App state:', this.state);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fetch us some wx oi</h1>
        </header>
        <div className="App-intro">
          <Search
            saveLocation={this.saveLocation}
            saveWeather={this.saveWeather}
          />
        </div>
      </div>
    );
  }

  // pass down to a prop to a geolocation and search location components, eh?
  saveLocation(obj) {
    // expect obj to contain keys: { lat: number, lng: number, locationName: string }
    let locations = this.state.locations;
    locations.push(obj);
    this.setState({ locations }, () => console.log('app state from save location cb:', this.state));
  }

  saveWeather(obj) {
    // expect obj to be of form: { locationName: string, wx: { wx, time } }
    let wx = this.state.wx;
    wx[obj.locationName] = obj.wx;
    this.setState({ wx }, () => console.log('app state from save weather cb:', this.state));
  }

  printTime(secs) {
    if (!secs) return '';
    return new Date(secs * 1000).toString(); // convert secs to milliseconds
  }

}

export default App;
