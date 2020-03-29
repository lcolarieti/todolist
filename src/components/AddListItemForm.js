import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setNewListItemAction, setNewTodoItemAction} from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons'

const mapStateToProps = state => {

  return {
    todosList: state.todosList,
    todosView: state.todosView,
    todosListId: state.todosListId
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setNewListItem: itemName => dispatch(setNewListItemAction(itemName)),
    setNewTodoItem: (itemId, itemName) => dispatch(setNewTodoItemAction(itemId, itemName))
  };
}

class AddItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
      enableSubmit: false,
      todosList: props.todosList,
      todosListId: props.todosListId,
      todosView: props.todosView,
      itemName: ''
    };

    this.showInput = this.showInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidUpdate(prevProps, prevStates) {
    prevProps.todosList !== this.props.todosList && this.setState({todosList: this.props.todosList});
    prevProps.todosListId !== this.props.todosListId && this.setState({todosListId: this.props.todosListId});
    prevProps.todosView !== this.props.todosView && this.setState({todosView: this.props.todosView});
    (prevStates.showInput !== this.state.showInput && this.state.showInput) && document.getElementById('new-list-item-input').focus();
  }

  handleSubmit(evt) {
    if (!this.state.enableSubmit) return;
    !this.state.todosView ? this.props.setNewListItem(this.state.itemName) : this.props.setNewTodoItem(this.state.todosListId, this.state.itemName);
    this.handleCancel();
  }

  handleChange(evt) {
    let itemName = evt.target.value;
    let alreadyExist = this.state.todosList.find((item) => {
      return item.name === itemName.trim();
    })
    this.setState({
      enableSubmit: (itemName.trim() !== '' && alreadyExist === undefined),
      itemName: itemName
    });
  }

  handleKeyPress(evt) {
    evt.keyCode === 13 && this.handleSubmit();
    evt.keyCode === 27 && this.handleCancel();
  }

  handleCancel() {
    this.setState({
      showInput: false,
      enableSubmit: false,
      itemName: ''
    });
  }

  showInput() {
    this.setState({showInput: true});
  }

  showHideFilter(show) {
    if (document.getElementsByTagName('select').length === 0) return;
    document.getElementsByTagName('select')[0].style.display = (show ? 'block' : 'none');
  }

  switchView() {
    let showInput = this.state.showInput;
    let placeholder = 'Add new Todo ' + (!this.state.todosView ? 'list' : '');
    if (showInput) {
      this.state.todosView && this.showHideFilter(false);
      return (
        <li className="new-list-item">
          <input id="new-list-item-input" type="text" onChange={this.handleChange} onKeyUp={this.handleKeyPress} placeholder={placeholder} />
          <button onClick={this.handleSubmit} disabled={!this.state.enableSubmit}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button onClick={this.handleCancel}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </li>
      );
    } else {
      this.state.todosView && this.showHideFilter(true);
      return (
        <li>
          <button onClick={this.showInput}>
            <FontAwesomeIcon icon={faPlusCircle} />
            <span className="item-name">Add new Todo {!this.state.todosView && 'list'}</span>
          </button>
        </li>
      );
    }
  }

  render() {
    return this.switchView()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
