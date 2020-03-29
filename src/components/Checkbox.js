import React, { Component } from 'react';
import {connect} from 'react-redux';
import {toggleCompletedAction} from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

function mapDispatchToProps(dispatch) {
  return {
    toggleCompleted: item => dispatch(toggleCompletedAction(item))
  };
}

class Checkbox extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.state = {completed: this.props.item.completed};
  }

  componentDidUpdate(prevProps) {
    prevProps.item.completed !== this.props.item.completed && this.setState({completed: this.props.item.completed});
  }

  handleClick() {
    this.props.toggleCompleted(this.props.item);
  }

  render() {
    return (
      <button className={'checkbox ' + (this.state.completed ? 'completed' : '')} onClick={this.handleClick}>
        <FontAwesomeIcon icon={faCheck} />
      </button>
    );
  }
}

export default connect(null, mapDispatchToProps)(Checkbox);
