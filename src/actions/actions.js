import {config} from '../config/config';

/*
 * action types
 */

export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const GETLIST_REQUESTED = 'GETLIST_REQUESTED';
export const GETLIST_RECEIVED = 'GETLIST_RECEIVED';
export const GETLIST_FAILED = 'GETLIST_FAILED';
export const SET_FETCHING = 'SET_FETCHING';
export const SETLIST_ITEM_RECEIVED = 'SETLIST_ITEM_RECEIVED';
export const RMVLIST_ITEM_RECEIVED = 'RMVLIST_ITEM_RECEIVED';
export const EDIT_MODE = 'EDIT_MODE';
export const EDITLIST_ITEM_RECEIVED = 'EDITLIST_ITEM_RECEIVED';

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addTodo(todo) {
  return { type: ADD_TODO, todo }
}

export function toggleTodo(id) {
  return { type: TOGGLE_TODO, id }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export function setFetching(fetching) {
  return { type: SET_FETCHING, fetching: fetching }
}

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

export function editModeAction(itemId) {
  return { type: EDIT_MODE, itemId: itemId }
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
