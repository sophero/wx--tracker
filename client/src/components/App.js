import React, { Component } from 'react';
import '../css/App.css';
import Search from './Search';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.saveWeather = this.saveWeather.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fetch us some wx oi</h1>
        </header>
        <div className="App-intro">
          <Search
            saveWeather={this.saveWeather}
          />
        </div>
      </div>
    );
  }

  saveWeather(obj) {
    // expect obj to be of form: { location: {}, wx: {}, time: {} }
    let data = this.state.data;
    data.push(obj);
    this.setState({ data }, () => console.log('app state from save weather cb:', this.state));
  }
}

export default App;
