import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  GETLIST_REQUESTED,
  GETLIST_RECEIVED,
  GETLIST_FAILED,
  SET_FETCHING,
  SETLIST_ITEM_RECEIVED,
  RMVLIST_ITEM_RECEIVED,
  EDIT_MODE,
  EDITLIST_ITEM_RECEIVED,
  VisibilityFilters
} from '../actions/actions';
const { SHOW_ALL } = VisibilityFilters;

const initialState = {
  todosList: [],
  todos: [],
  filter: SHOW_ALL,
  fetching: false
};

function rootReducer(state = initialState, action) {

  switch (action.type) {
    case ADD_TODO:
      addTodo(state, action);
      break;
    case TOGGLE_TODO:
      toggleTodo(state, action);
      break;
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {filter: action.filter});
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
    case EDITLIST_ITEM_RECEIVED:
      return editListItem(state, action);
    default:
      return state;
  }

}

const addTodo = (state, action) => {
  return Object.assign({}, state, {
    todos: action.todo
  });
};

const toggleTodo = (state, action) => {
  state.todos.map((todo, i) => {
    if (action.todoId === todo.id) return Object.assign({}, todo, {
      completed: !todo.completed
    });
    return true;
  });
  return state.todos;
};

const setNewListItem = (state, action) => {
  return Object.assign({}, state, {todosList: state.todosList.concat([action.newItem])});
};

const removeListItem = (state, action) => {
  return Object.assign({}, state, {todosList: state.todosList.filter((item) => {return item._id !== action.removedItemId})});
};

const editMode = (state, action) => {
  return Object.assign({}, state, {todosList: state.todosList.map((item) => {
    if (item._id === action.itemId) return Object.assign(item, {editMode: (!item.hasOwnProperty('editMode') ? true : !item.editMode)});
    return item;
  })});
};

const editListItem = (state, action) => {
  return Object.assign({}, state, {todosList: state.todosList.map((item) => {
    return (item._id === action.editedItem._id ? action.editedItem : item);
  })});
};

export default rootReducer;
