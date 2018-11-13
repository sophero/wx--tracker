import React, { Component } from 'react';

class LocationName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      name: props.name
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  render() {
    let locationDiv;
    if (this.state.editing) {
      locationDiv =
        <input
          autoFocus
          className="table__data table__data--location"
          onChange={e => this.setState({ name: e.target.value })}
          onKeyUp={e => {if (e.key === "Enter") this.handleEdit()}}
          type="text"
          value={this.state.name}
        />
        } else {
          locationDiv =
          <div
            className="table__data table__data--location"
            onClick={this.toggleEdit}
          >
          {this.state.name}
        </div>
    }

    return locationDiv;
  }

  handleEdit() {
    const { name } = this.state;
    this.props.editName(name, this.toggleEdit);
  }

  toggleEdit() {
    this.setState({ editing: !this.state.editing });
  }
}

export default LocationName;