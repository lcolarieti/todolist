import React, { Component } from 'react';
import {connect} from 'react-redux';
import {renameListItemAction, renameTodoItemAction, editModeAction, editModeTodoAction} from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const mapStateToProps = state => {

  return {
    todosList: state.todosList,
    todosView: state.todosView
  };
};

function mapDispatchToProps(dispatch) {
  return {
    renameListItem: (itemId, value) => dispatch(renameListItemAction(itemId, value)),
    renameTodoItem: (itemId, value) => dispatch(renameTodoItemAction(itemId, value)),
    editMode: itemId => dispatch(editModeAction(itemId)),
    editModeTodo: itemId => dispatch(editModeTodoAction(itemId))
  };
}

class RenameItemInput extends Component {

  constructor(props) {
    super(props);

    this.state = {
      itemValue: this.props.item.name,
      enableSubmit: false,
      todosList: props.todosList
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount(prevProps, prevStates) {
    document.getElementById('edit-list-item-input').focus();
  }

  handleCancel() {
    !this.props.todosView ? this.props.editMode(this.props.item._id) : this.props.editModeTodo(this.props.item._id);
  }

  handleSubmit() {
    if (!this.state.enableSubmit) return;
    !this.props.todosView
      ? this.props.renameListItem(this.props.item._id, this.state.itemValue)
      : this.props.renameTodoItem(this.props.item._id, this.state.itemValue);
  }

  handleInputChange(evt) {
    let itemValue = evt.target.value;
    let alreadyExist = this.state.todosList.find((item) => {
      return item.name === itemValue.trim();
    })
    this.setState({
      enableSubmit: (itemValue.trim() !== '' && alreadyExist === undefined),
      itemValue: itemValue
    });
  }

  handleKeyPress(evt) {
    evt.keyCode === 13 && this.handleSubmit();
    evt.keyCode === 27 && this.handleCancel();
  }

  render() {
    return (
      <>
        <input id="edit-list-item-input" type="text" value={this.state.itemValue} onChange={this.handleInputChange} onKeyUp={this.handleKeyPress} />
        <button onClick={this.handleSubmit} disabled={!this.state.enableSubmit}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button onClick={this.handleCancel}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RenameItemInput);
