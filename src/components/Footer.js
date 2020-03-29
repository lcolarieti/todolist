import React, { Component } from 'react';
import {connect} from 'react-redux';
import utils from '../utils/utils';

const mapStateToProps = state => {

  return {
    todosList: state.todosList,
    todosView: state.todosView,
    todosListId: state.todosListId,
    filter: state.filter
  };
};

class Footer extends Component {

  render() {
    return (
      <footer>
        <div className="wrap">
          <div className="left">
            <span>Total items:</span>
            <strong>{this.counter()}</strong>
          </div>
          <div className="right">
            {this.completedItems()}
          </div>
        </div>
      </footer>
    );
  }

  completedItems() {
    if (this.props.todosView) {
      let completed = this.props.todosList.filter((item) => {
        return item._id === this.props.todosListId;
      })[0].todos.filter((todo) => {
        return todo.completed;
      }).length;
      return (
        <>
          <span>Completed items:</span>
          <strong>{completed}</strong>
        </>
      );
    }
    return ('');
  }

  counter() {
    return (
      !this.props.todosView
        ? this.props.todosList
        : utils.getTodosByListId(this.props.todosList, this.props.todosListId, this.props.filter)
    ).length;
  }

}

export default connect(mapStateToProps, null)(Footer);
