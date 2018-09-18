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
    this.sortBy = this.sortBy.bind(this);
    this.sortByDewPoint = this.sortByDewPoint.bind(this);
    this.sortByLocation = this.sortByLocation.bind(this);
    this.sortByPressure = this.sortByPressure.bind(this);
    this.sortByTemp = this.sortByTemp.bind(this);
    this.sortByWindDir = this.sortByWindDir.bind(this);
    this.sortByWindSpeed = this.sortByWindSpeed.bind(this);
    this.saveWeather = this.saveWeather.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
  }

  render() {
    let displayTable;
    if (this.state.data.length > 0) {
      displayTable = <Table
        data={this.state.data}
        sortByDewPoint={this.sortByDewPoint}
        sortByLocation={this.sortByLocation}
        sortByPressure={this.sortByPressure}
        sortByTemp={this.sortByTemp}
        sortByWindDir={this.sortByWindDir}
        sortByWindSpeed={this.sortByWindSpeed}
        removeRow={this.removeRow}
        selectRow={this.selectRow} />
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

  sortByDewPoint(ascending = true) {
    const dewPointArr = this.state.data.map(loc => loc.wx.dewPoint);
    this.sortBy(dewPointArr, ascending);
  }

  sortByLocation(reverse = false) {
    let data = this.state.data;
    data.sort((a, b) => {
      if (a.location.name > b.location.name) return 1;
      if (a.location.name < b.location.name) return -1;
      return 0;
    });
    if (reverse) data = data.reverse();
    this.setState({ data });
  }

  sortByPressure(ascending = true) {
    const pressureArr = this.state.data.map(loc => loc.wx.pressure);
    this.sortBy(pressureArr, ascending);
  }

  sortByTemp(ascending = true) {
    const tempArr = this.state.data.map(loc => loc.wx.temp);
    this.sortBy(tempArr, ascending);
  }

  sortByWindDir(ascending = true) {
    const windDirArr = this.state.data.map(loc => loc.wx.windBearing);
    this.sortBy(windDirArr, ascending);
  }

  sortByWindSpeed(ascending = true) {
    const windSpeedArr = this.state.data.map(loc => loc.wx.windSpeed);
    this.sortBy(windSpeedArr, ascending);
  }

  sortBy(arrToSort, ascending) {
    const data = this.state.data;
    const len = data.length;
    if (len !== arrToSort.length) return;
    let indArr = [...Array(len).keys()];

    for (let k = 0; k < len; k++) {
      for (let n = 0; n < len - k - 1; n++) {

        if (arrToSort[n] > arrToSort[n + 1]) {
          let tmp = [ arrToSort[n], indArr[n] ];

          arrToSort[n] = arrToSort[n + 1];
          indArr[n] = indArr[n + 1];

          [ arrToSort[n + 1], indArr[n + 1] ] = tmp;
        }
      }
    }

    let sortedArr = Array(len);
    for (let k = 0; k < len; k++) {
      sortedArr[k] = data[indArr[k]];
    }

    if (!ascending) sortedArr = sortedArr.reverse();
    this.setState({ data: sortedArr });
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
