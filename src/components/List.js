import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getListAction} from '../actions/actions';
import AddItem from './AddListItemForm';
import RemoveItem from './RemoveItem';
import RenameItemIcon from './RenameItem';
import RenameItemInput from './RenameItemInput';

const mapStateToProps = state => {
  return {
    todosList: state.todosList
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getList: () => dispatch(getListAction())
  };
}

class List extends Component {

  componentDidMount() {
    this.props.getList();
  }

  createListItem() {
    let itemList = this.props.todosList.map((item, i) => {
      let editMode = (item.hasOwnProperty('editMode') ? item.editMode : false);
      if (!editMode)
        return (
          <li key={item._id} id={item._id}>
            {item.name}
            <RenameItemIcon itemId={item._id} />
            <RemoveItem itemId={item._id} />
          </li>
        );
      else
        return (
          <li key={item._id} id={item._id}>
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
      <div className="list-wrap">
        {this.createListItem()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
