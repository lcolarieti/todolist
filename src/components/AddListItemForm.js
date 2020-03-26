import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setNewListItemAction} from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const mapStateToProps = state => {

  return {
    todosList: state.todosList
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setNewListItem: itemName => dispatch(setNewListItemAction(itemName))
  };
}

class AddItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
      enableSubmit: false,
      todosList: props.todosList,
      itemName: ''
    };

    this.showInput = this.showInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidUpdate(prevProps, prevStates) {
    prevProps.todosList !== this.props.todosList && this.setState({todosList: this.props.todosList});
    (prevStates.showInput !== this.state.showInput && this.state.showInput) && document.getElementById('new-list-item-input').focus();
  }

  handleSubmit(evt) {
    if (!this.state.enableSubmit) return;
    this.props.setNewListItem(this.state.itemName);
    this.setState({
      showInput: false,
      enableSubmit: false,
      itemName: ''
    });
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
  }

  showInput() {
    this.setState({showInput: true});
  }

  switchView() {
    let showInput = this.state.showInput;
    if (showInput) {
      return (
        <li>
          <input id="new-list-item-input" type="text" onChange={this.handleChange} onKeyUp={this.handleKeyPress} />
          <button onClick={this.handleSubmit} disabled={!this.state.enableSubmit}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </li>
      );
    } else {
      return (
        <li>
          <button onClick={this.showInput}>
            <FontAwesomeIcon icon={faPlusCircle} />
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
