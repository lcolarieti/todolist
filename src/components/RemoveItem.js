import React, { Component } from 'react';
import {connect} from 'react-redux';
import {removeListItemAction} from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


function mapDispatchToProps(dispatch) {
  return {
    removeListItem: itemId => dispatch(removeListItemAction(itemId))
  };
}

class RemoveItem extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.removeListItem(this.props.itemId);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    );
  }
}

export default connect(null, mapDispatchToProps)(RemoveItem);
