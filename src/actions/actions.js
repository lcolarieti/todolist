import {config} from '../config/config';

/*
 * action types
 */

export const GETLIST_REQUESTED = 'GETLIST_REQUESTED';
export const GETLIST_RECEIVED = 'GETLIST_RECEIVED';
export const GETLIST_FAILED = 'GETLIST_FAILED';
export const SET_FETCHING = 'SET_FETCHING';
export const SETLIST_ITEM_RECEIVED = 'SETLIST_ITEM_RECEIVED';
export const RMVLIST_ITEM_RECEIVED = 'RMVLIST_ITEM_RECEIVED';
export const EDIT_MODE = 'EDIT_MODE';
export const EDITLIST_ITEM_RECEIVED = 'EDITLIST_ITEM_RECEIVED';
export const SET_TODO_LIST = 'SET_TODO_LIST';
export const GOTO_ROOT = 'GOTO_ROOT';
export const SETTODO_ITEM_RECEIVED = 'SETTODO_ITEM_RECEIVED';
export const EDIT_MODE_TODO = 'EDIT_MODE_TODO';
export const EDITTODO_ITEM_RECEIVED = 'EDITTODO_ITEM_RECEIVED';
export const RMVTODO_ITEM_RECEIVED = 'RMVTODO_ITEM_RECEIVED';
export const TOGGLE_COMPLETED = 'TOGGLE_COMPLETED';
export const SHOW_ALL = 'SHOW_ALL';
export const SHOW_COMPLETED = 'SHOW_COMPLETED';
export const SHOW_UNCOMPLETED = 'SHOW_UNCOMPLETED';
export const FILTER_CHANGED = 'FILTER_CHANGED';

/*
 * action creators
 */

export function getListAction() {
  return (dispatch) => {
    dispatch({type: GETLIST_REQUESTED, todosList:[]});
    dispatch({type: SET_FETCHING, fetching: true});

    fetch(`${config.api}/list`)
      .then(res => res.json())
      .then((response) => {
        dispatch({type: GETLIST_RECEIVED, todosList: response});
        dispatch({type: SET_FETCHING, fetching: false});
      })
      .catch(err => {
        dispatch({type: SET_FETCHING, fetching: false});
      });
  }
}

export function setNewListItemAction(itemName) {
  return (dispatch) => {
    dispatch({type: SET_FETCHING, fetching: true});

    fetch(`${config.api}/list`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: itemName.trim()})
      })
      .then(res => res.json())
      .then((response) => {
        dispatch({type: SETLIST_ITEM_RECEIVED, newItem: response});
        dispatch({type: SET_FETCHING, fetching: false});
      })
      .catch(err => {
        dispatch({type: SET_FETCHING, fetching: false});
      });
  }
}

export function setNewTodoItemAction(listId, todoName) {
  return (dispatch) => {
    dispatch({type: SET_FETCHING, fetching: true});

    fetch(`${config.api}/list/${listId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: todoName.trim()})
      })
      .then(res => res.json())
      .then((response) => {
        dispatch({type: SETTODO_ITEM_RECEIVED, newItem: response});
        dispatch({type: SET_FETCHING, fetching: false});
      })
      .catch(err => {
        dispatch({type: SET_FETCHING, fetching: false});
      });
  }
}

export function removeListItemAction(itemId) {
  return (dispatch, getState) => {
    dispatch({type: SET_FETCHING, fetching: true});

    fetch(`${config.api}/list/${itemId}`,
      {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then((response) => {
        dispatch({type: RMVLIST_ITEM_RECEIVED, removedItemId: itemId});
        dispatch({type: SET_FETCHING, fetching: false});
      })
      .catch(err => {
        dispatch({type: SET_FETCHING, fetching: false});
      });
  }
}

export function removeTodoItemAction(itemId) {
  return (dispatch, getState) => {
    dispatch({type: SET_FETCHING, fetching: true});

    fetch(`${config.api}/list/${getState().todosListId}/${itemId}`,
      {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then((response) => {
        dispatch({type: RMVTODO_ITEM_RECEIVED, todosListItem: response});
        dispatch({type: SET_FETCHING, fetching: false});
      })
      .catch(err => {
        dispatch({type: SET_FETCHING, fetching: false});
      });
  }
}

export function editModeAction(itemId) {
  return { type: EDIT_MODE, itemId: itemId }
};

export function editModeTodoAction(itemId) {
  return { type: EDIT_MODE_TODO, itemId: itemId }
};

export function renameListItemAction(itemId, itemValue) {
  return (dispatch, getState) => {
    dispatch({type: SET_FETCHING, fetching: true});

    fetch(`${config.api}/list/${itemId}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: itemValue.trim()})
      })
      .then(res => res.json())
      .then((response) => {
        dispatch({type: EDITLIST_ITEM_RECEIVED, editedItem: response});
        dispatch({type: SET_FETCHING, fetching: false});
      })
      .catch(err => {
        dispatch({type: SET_FETCHING, fetching: false});
      });
  }
};

export function renameTodoItemAction(itemId, itemValue) {
  return (dispatch, getState) => {
    dispatch({type: SET_FETCHING, fetching: true});

    fetch(`${config.api}/list/${getState().todosListId}/${itemId}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: itemValue.trim()})
      })
      .then(res => res.json())
      .then((response) => {
        dispatch({type: EDITTODO_ITEM_RECEIVED, editedItem: response});
        dispatch({type: SET_FETCHING, fetching: false});
      })
      .catch(err => {
        dispatch({type: SET_FETCHING, fetching: false});
      });
  }
};

export function setTodoListAction(itemId) {
  return (dispatch) => {
    dispatch({type: SET_TODO_LIST, todosListId: itemId});
  };
};

export function goToRootAction() {
  return (dispatch) => {
    dispatch({type: GOTO_ROOT})
  }
};

export function toggleCompletedAction(item) {
  return (dispatch, getState) => {
    dispatch({type: SET_FETCHING, fetching: true});

    fetch(`${config.api}/list/${getState().todosListId}/${item._id}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({completed: item.completed})
      })
      .then(res => res.json())
      .then((response) => {
        dispatch({type: TOGGLE_COMPLETED, editedItem: response});
        dispatch({type: SET_FETCHING, fetching: false});
      })
      .catch(err => {
        dispatch({type: SET_FETCHING, fetching: false});
      });
  }
};

export function filterChangedAction(filter) {
  return {type: FILTER_CHANGED, filter: filter};
};
