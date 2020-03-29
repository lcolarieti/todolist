import {
  TOGGLE_COMPLETED,
  GETLIST_REQUESTED,
  GETLIST_RECEIVED,
  GETLIST_FAILED,
  SET_FETCHING,
  SETLIST_ITEM_RECEIVED,
  RMVLIST_ITEM_RECEIVED,
  EDIT_MODE,
  EDITLIST_ITEM_RECEIVED,
  SET_TODO_LIST,
  GOTO_ROOT,
  SETTODO_ITEM_RECEIVED,
  EDIT_MODE_TODO,
  EDITTODO_ITEM_RECEIVED,
  RMVTODO_ITEM_RECEIVED,
  SHOW_ALL,
  FILTER_CHANGED
} from '../actions/actions';
import utils from '../utils/utils';


const initialState = {
  todosList: [],
  todosListId: null,
  fetching: false,
  todosView: false,
  filter: SHOW_ALL
};

function rootReducer(state = initialState, action) {

  switch (action.type) {
    case GETLIST_REQUESTED:
    case GETLIST_RECEIVED:
    case GETLIST_FAILED:
      return Object.assign({}, state, {todosList: action.todosList});
    case SETLIST_ITEM_RECEIVED:
      return setNewListItem(state, action);
    case SET_FETCHING:
      return Object.assign({}, state, {fetching: action.fetching});
    case RMVLIST_ITEM_RECEIVED:
      return removeListItem(state, action);
    case EDIT_MODE:
      return editMode(state, action);
    case EDIT_MODE_TODO:
      return editModeTodo(state, action);
    case EDITLIST_ITEM_RECEIVED:
    case EDITTODO_ITEM_RECEIVED:
    case TOGGLE_COMPLETED:
      return editListItem(state, action);
    case SET_TODO_LIST:
      return setTodoList(state, action);
    case GOTO_ROOT:
      return resetRootState(state)
    case SETTODO_ITEM_RECEIVED:
      return setNewTodoItem(state, action);
    case RMVTODO_ITEM_RECEIVED:
      return removeTodoItem(state, action);
    case FILTER_CHANGED:
      return Object.assign({}, state, {filter: action.filter});
    default:
      return state;
  }

}


const setNewListItem = (state, action) => {
  return Object.assign({}, state, {todosList: state.todosList.concat([action.newItem])});
};

const removeListItem = (state, action) => {
  return Object.assign({}, state, {
      todosList: state.todosList.filter((item) => {return item._id !== action.removedItemId})
    }
  );
};

const removeTodoItem = (state, action) => {
  return Object.assign({}, state, {
      todosList: state.todosList.map((item) => {
        if (item._id === state.todosListId) {
          item = action.todosListItem;
        }
        return item;
      })
    }
  );
};

const editMode = (state, action) => {
  return Object.assign({}, state, {todosList: state.todosList.map((item) => {
    if (item._id === action.itemId) return Object.assign(item, {editMode: (!item.hasOwnProperty('editMode') ? true : !item.editMode)});
    return item;
  })});
};

const editModeTodo = (state, action) => {
  let todos = utils.getTodosByListId(state.todosList, state.todosListId).map((todo) => {
    if (todo._id === action.itemId) return Object.assign(todo, {editMode: (!todo.hasOwnProperty('editMode') ? true : !todo.editMode)});
    return todo;
  });
  return Object.assign({}, state, {todosList: state.todosList.map((item) => {
    if (item._id === state.todosListId) return Object.assign(item, {todos: todos});
    return item;
  })});
};

const editListItem = (state, action) => {
  return Object.assign({}, state, {todosList: state.todosList.map((item) => {
    if (item._id === action.editedItem._id)
      return Object.assign(action.editedItem, {todos: action.editedItem.todos});
    else
      return item;
  })});
};

const setTodoList = (state, action) => {
  return Object.assign({}, state, {todosListId: action.todosListId, todosView: true});
}

const resetRootState = (state) => {
  return Object.assign({}, state, {todosListId: null, todosView: false});
}

const setNewTodoItem = (state, action) => {
  let updatedTodosList = state.todosList.map((item) => {
    if (item._id === action.newItem._id) item = action.newItem;
    return item;
  });
  return Object.assign({}, state, {todosList: updatedTodosList});
};

export default rootReducer;
