import React, { Component } from 'react';
import '../css/App.css';
import Search from './Search';
import Table from './Table';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      rowSelected: null
    };
    this.saveWeather = this.saveWeather.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
  }

  render() {
    let displayTable;
    if (this.state.data.length > 0) {
      displayTable = <Table
        data={this.state.data}
        selectRow={this.selectRow}
        removeRow={this.removeRow} />
    }

    let removeBtn;
    if (this.state.rowSelected !== null) {
      removeBtn = <button
        onClick={() => this.removeRow(this.state.rowSelected)}>
          Remove selected location
        </button>
    }

    return (
      <div className="App">
        <Search saveWeather={this.saveWeather} />
        {displayTable}
        {removeBtn}
      </div>
    );
  }

  saveWeather(obj) {
    const name = obj.location.name;
    let data = this.state.data;
    
    // if location has already been loaded, remove from array before pushing new data
    data.forEach((loc, ind) => {
      if (name === loc.location.name) data.splice(ind, 1);
    })
    data.push(obj);
    this.setState({ data }, () => console.log('app state from save weather cb:', this.state));
  }

  selectRow(ind) {
    this.setState({ rowSelected: ind });
  }

  removeRow(ind) {
    let data = this.state.data;
    data.splice(ind, 1);
    this.setState({
      data,
      rowSelected: null
    });
  }
}

export default App;
