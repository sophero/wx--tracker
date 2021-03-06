import React, { Component } from 'react';
import '../css/App.css';
import Search from './Search';
import Table from './Table';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      rowSelected: null,
      units: {
        temp: "F",
        wind: "mph"
      },
      width: 0,
      height: 0
    };

    this.searchComponent = React.createRef();

    this.editName = this.editName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.sortByHelper = this.sortByHelper.bind(this);
    this.sortByLocation = this.sortByLocation.bind(this);
    this.saveWeather = this.saveWeather.bind(this);
    this.selectRow = this.selectRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.toggleUnits = this.toggleUnits.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  render() {
    let displayTable, darkskyAttr;
    if (this.state.data.length > 0) {
      displayTable = <Table
        data={this.state.data}
        width={this.state.width}
        height={this.state.height}
        editName={this.editName}
        refreshData={this.refreshData}
        removeRow={this.removeRow}
        rowSelected={this.state.rowSelected}
        selectRow={this.selectRow}
        sortByHelper={this.sortByHelper}
        sortByLocation={this.sortByLocation}
        toggleUnits={this.toggleUnits}
        units={this.state.units}
      />
      darkskyAttr = <a href="https://darksky.net/poweredby/" className="darksky__attr" target="_blank" rel="noopener noreferrer"><div className="darksky__attr--img"></div></a>
    }

    let removeBtn;
    if (this.state.rowSelected !== null) {
      removeBtn = <button
        className="table__btn table__remove-btn"
        onClick={() => this.removeRow(this.state.rowSelected)}>
          Remove selected location
        </button>
    }

    return (
      <div className="App">
        <Search
          ref={this.searchComponent}
          saveWeather={this.saveWeather} />
        {displayTable}
        {removeBtn}
        {darkskyAttr}
      </div>
    );
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  editName(name, cb) {
    const { data, rowSelected } = this.state;
    data[rowSelected].location.name = name;
    this.setState({ data }, cb);
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

  sortByHelper(dataLocator, ascending) {
    const arrToSort = this.state.data.map(dataLocator);
    this.sortBy(arrToSort, ascending);
  }

  sortBy(arrToSort, ascending) {
    const data = this.state.data;
    const len = data.length;

    if (len !== arrToSort.length) return;
    let indArr = [...Array(len).keys()]; // create array of indices to track sorting order

    // Bubble sort algorithm
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

    // fill in sortedArr using data and indArr
    let sortedArr = Array(len);
    for (let k = 0; k < len; k++) {
      sortedArr[k] = data[indArr[k]];
    }

    if (!ascending) sortedArr = sortedArr.reverse();
    this.setState({ data: sortedArr });
  }

  saveWeather(obj, cb) {
    const { name, lat, lng } = obj.location;
    let data = this.state.data;
    
    // if location has already been loaded, remove from array before pushing new data
    for (let k = 0; k < data.length; k++) {
      const loc = data[k].location;
      if (name === loc.name || (lat === loc.lat && lng === loc.lng)) {
        data.splice(k, 1);
      }
    }
    data.push(obj);
    this.setState({ data }, cb);
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

  refreshData() {
    this.searchComponent.current.showLoading();
    const data = this.state.data;
    for (let k = 0; k < data.length; k++) {
      this.searchComponent.current.getCurrentWeather(data[k].location);
    }
    this.setState({ rowSelected: null });
  }

  toggleUnits() {
    let { units } = this.state;
    if (this.state.units.temp === 'C') {
      units = { temp: 'F', wind: 'mph' }
    } else {
      units = { temp: 'C', wind: 'kph' }
    }
    this.setState({ units });
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
}

export default App;
