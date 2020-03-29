import React, { Component } from 'react';
import {connect} from 'react-redux';
import AddItem from './AddListItemForm';
import RemoveItem from './RemoveItem';
import RenameItemIcon from './RenameItem';
import RenameItemInput from './RenameItemInput';
import Checkbox from './Checkbox';
import Filters from './Filters';
import utils from '../utils/utils';

const mapStateToProps = state => {
  return {
    todosList: state.todosList,
    todosListId: state.todosListId,
    filter: state.filter
  };
};

class ListTodos extends Component {

  constructor(props) {
    super(props);

    this.todos = utils.getTodosByListId(this.props.todosList, this.props.todosListId, this.props.filter);
  }

  dateFormatter(date) {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleDateString('it-IT', options);
  }

  componentDidUpdate(prevProps) {
    if (utils.getTodosByListId(prevProps.todosList, prevProps.todosListId) !== utils.getTodosByListId(this.props.todosList, this.props.todosListId) || (prevProps.filter !== this.props.filter)) {
      this.todos = utils.getTodosByListId(this.props.todosList, this.props.todosListId, this.props.filter);
      this.forceUpdate();
    }
  }

  createListItem() {
    let itemList = this.todos.map((item, i) => {
      let editMode = (item.hasOwnProperty('editMode') ? item.editMode : false);

      if (!editMode)
        return (
          <li key={item._id} id={item._id}>
            <div className="item-wrap">
              <Checkbox item={item} />
              <div className="span-wrap">
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
      <div className="list-wrap todos wrap">
        <Filters />
        {this.createListItem()}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ListTodos);
