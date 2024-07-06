import {
  TODO_CREATE_FAIL,
  TODO_CREATE_REQUEST,
  TODO_CREATE_RESET,
  TODO_CREATE_SUCCESS,
  TODO_DELETE_FAIL,
  TODO_DELETE_REQUEST,
  TODO_DELETE_RESET,
  TODO_DELETE_SUCCESS,
  TODO_LIST_FAIL,
  TODO_LIST_REQUEST,
  TODO_LIST_SUCCESS,
  TODO_SINGLE_TODO_FAIL,
  TODO_SINGLE_TODO_REQUEST,
  TODO_SINGLE_TODO_RESET,
  TODO_SINGLE_TODO_SUCCESS,
  TODO_UPDATE_FAIL,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_RESET,
  TODO_UPDATE_SUCCESS,
} from "../constants/todoConstants";

export const toDoListReducer = (state = { toDos: [] }, action) => {
  switch (action.type) {
    case TODO_LIST_REQUEST:
      return { ...state, loading: true };
    case TODO_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        toDos: action.payload.data.data,
        total: action.payload.data.total,
      };
    case TODO_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export const toDoCreateReducer = (
  state = { success: false, createdToDo: {} },
  action
) => {
  switch (action.type) {
    case TODO_CREATE_REQUEST:
      return { ...state, loading: true };
    case TODO_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        createdToDo: action.payload,
      };
    case TODO_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case TODO_CREATE_RESET:
      return { ...state, success: false };
    default:
      return state;
  }
};
export const toDoUpdateReducer = (
  state = { success: false, updatedToDo: {} },
  action
) => {
  switch (action.type) {
    case TODO_UPDATE_REQUEST:
      return { ...state, loading: true };
    case TODO_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        updatedToDo: action.payload,
      };
    case TODO_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case TODO_UPDATE_RESET:
      return { ...state, success: false };
    default:
      return state;
  }
};
export const toDoSingleReducer = (state = { singleToDo: {} }, action) => {
  switch (action.type) {
    case TODO_SINGLE_TODO_REQUEST:
      return { ...state, loading: true };
    case TODO_SINGLE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        singleToDo: action.payload,
      };
    case TODO_SINGLE_TODO_FAIL:
      return { ...state, loading: false, error: action.payload };
    case TODO_SINGLE_TODO_RESET:
      return { ...state, success: false, singleToDo: {} };
    default:
      return state;
  }
};

export const toDoDeleteReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case TODO_DELETE_REQUEST:
      return { ...state, loading: true };
    case TODO_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case TODO_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case TODO_DELETE_RESET:
      return { ...state, success: false };
    default:
      return state;
  }
};
