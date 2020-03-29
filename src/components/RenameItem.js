import React, { Component } from 'react';
import {connect} from 'react-redux';
import {editModeAction, editModeTodoAction} from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'


const mapStateToProps = state => {
  return {
    todosView: state.todosView
  };
};

function mapDispatchToProps(dispatch) {
  return {
    editMode: itemId => dispatch(editModeAction(itemId)),
    editModeTodo: itemId => dispatch(editModeTodoAction(itemId))
  };
}

class RenameItemIcon extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    !this.props.todosView ? this.props.editMode(this.props.itemId) : this.props.editModeTodo(this.props.itemId);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        <FontAwesomeIcon icon={faPencilAlt} />
      </button>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenameItemIcon);
