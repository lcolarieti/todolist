import {
  SHOW_COMPLETED,
  SHOW_UNCOMPLETED
} from '../actions/actions';


const utils = {

  getTodosByListId: (list, listId, filter) => {
    if (!list || !listId) return [];
    const listItem = list.filter((item) => {return item._id === listId});
    if (!listItem) return [];
    if (listItem.length === 0 || listItem.length > 1) return [];
    if (!listItem[0].hasOwnProperty('todos')) return [];
    if (filter !== undefined) {
      switch (filter) {
        case SHOW_COMPLETED:
          let completedTodos = listItem[0].todos.filter((todo) => {return todo.completed;});
          return completedTodos;
        case SHOW_UNCOMPLETED:
          let uncompletedTodos = listItem[0].todos.filter((todo) => {return !todo.completed;});
          return uncompletedTodos;
        default:
          return listItem[0].todos;
      }
    }
    return listItem[0].todos;
  },

  getListItemById: (list, listId) => {
    if (!list || !listId) return null;
    const listItem = list.filter((item) => {return item._id === listId});
    if (!listItem) return null;
    if (listItem.length === 0 || listItem.length > 1) return null;
    return listItem[0];
  },

};

export default utils;
