import React, { Component } from 'react';
import {connect} from 'react-redux';
import {renameListItemAction, editModeAction} from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const mapStateToProps = state => {

  return {
    todosList: state.todosList
  };
};

function mapDispatchToProps(dispatch) {
  return {
    renameListItem: (itemId, value) => dispatch(renameListItemAction(itemId, value)),
    editMode: itemId => dispatch(editModeAction(itemId))
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

  handleCancel() {
    this.props.editMode(this.props.item._id);
  }

  handleSubmit() {
    if (!this.state.enableSubmit) return;
    this.props.renameListItem(this.props.item._id, this.state.itemValue);
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
  }

  render() {
    return (
      <>
        <input type="text" value={this.state.itemValue} onChange={this.handleInputChange} />
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
