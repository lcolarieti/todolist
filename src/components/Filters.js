import React, { Component } from 'react';
import {connect} from 'react-redux';
import {filterChangedAction} from '../actions/actions';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_UNCOMPLETED
} from '../actions/actions';

function mapDispatchToProps(dispatch) {
  return {
    filterChanged: filter => dispatch(filterChangedAction(filter))
  };
}

class Filters extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.props.filterChanged(evt.target.value);
  }

  render() {
    return (
      <select onChange={this.handleChange}>
        <option value={SHOW_ALL}>Show all</option>
        <option value={SHOW_COMPLETED}>Show completed</option>
        <option value={SHOW_UNCOMPLETED}>Show uncompleted</option>
      </select>
    );
  }

  componentWillUnmount() {
    this.props.filterChanged(SHOW_ALL);
  }

}

export default connect(null, mapDispatchToProps)(Filters);
