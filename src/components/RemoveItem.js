import React, { Component } from 'react';
import {connect} from 'react-redux';
import {removeListItemAction, removeTodoItemAction} from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const mapStateToProps = state => {

  return {
    todosView: state.todosView
  };
};

function mapDispatchToProps(dispatch) {
  return {
    removeListItem: itemId => dispatch(removeListItemAction(itemId)),
    removeTodoItem: itemId => dispatch(removeTodoItemAction(itemId))
  };
}

class RemoveItem extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    !this.props.todosView ? this.props.removeListItem(this.props.itemId) : this.props.removeTodoItem(this.props.itemId);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveItem);
