import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getListAction, setTodoListAction} from '../actions/actions';
import AddItem from './AddListItemForm';
import RemoveItem from './RemoveItem';
import RenameItemIcon from './RenameItem';
import RenameItemInput from './RenameItemInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'

const mapStateToProps = state => {
  return {
    todosList: state.todosList
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getList: () => dispatch(getListAction()),
    setTodoList: (itemId) => dispatch(setTodoListAction(itemId))
  };
}

class List extends Component {

  constructor(props) {
    super(props);

    this.handleClickOnItem = this.handleClickOnItem.bind(this);
  }

  componentDidMount() {
    this.props.getList();
  }

  dateFormatter(date) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString('it-IT', options);
  }

  handleClickOnItem(itemId) {
    this.props.setTodoList(itemId);
  }

  createListItem() {
    let itemList = this.props.todosList.map((item, i) => {
      let editMode = (item.hasOwnProperty('editMode') ? item.editMode : false);

      if (!editMode)
        return (
          <li key={item._id} id={item._id}>
            <div className="item-wrap">
              <FontAwesomeIcon icon={faBullseye} />
              <div className="span-wrap"  onClick={() => this.handleClickOnItem(item._id)}>
                <span className="item-name" title={item.name}>{item.name}</span>
                <span className="item-date">({this.dateFormatter(item.updatedAt)})</span>
              </div>
              <div className="btn-wrap">
                <RenameItemIcon itemId={item._id} />
                <RemoveItem itemId={item._id} />
              </div>
            </div>
          </li>
        );
      else
        return (
          <li key={item._id} id={item._id} className="edit-list-item">
            <RenameItemInput item={item} />
          </li>
        );
    });
    return (
      <ul>
        {itemList}
        <AddItem />
      </ul>
    );
  }

  render() {
    return (
      <div className="list-wrap wrap">
        {this.createListItem()}
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(List);
