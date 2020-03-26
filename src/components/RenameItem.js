import React, { Component } from 'react';
import {connect} from 'react-redux';
import {editModeAction} from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'


function mapDispatchToProps(dispatch) {
  return {
    editMode: itemId => dispatch(editModeAction(itemId))
  };
}

class RenameItemIcon extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.editMode(this.props.itemId)
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
    );
  }
}

export default connect(null, mapDispatchToProps)(RenameItemIcon);
