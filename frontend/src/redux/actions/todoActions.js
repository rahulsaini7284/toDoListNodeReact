import axios from "axios";
import {
  TODO_CREATE_FAIL,
  TODO_CREATE_REQUEST,
  TODO_CREATE_SUCCESS,
  TODO_DELETE_FAIL,
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_LIST_FAIL,
  TODO_LIST_REQUEST,
  TODO_LIST_SUCCESS,
  TODO_SINGLE_TODO_FAIL,
  TODO_SINGLE_TODO_REQUEST,
  TODO_SINGLE_TODO_SUCCESS,
  TODO_UPDATE_FAIL,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
} from "../constants/todoConstants";

export const toDoListAction = () => async (dispatch) => {
  try {
    dispatch({
      type: TODO_LIST_REQUEST,
    });
    const { data, total } = await axios.get("/api/todo/getAll");
    dispatch({
      type: TODO_LIST_SUCCESS,
      payload: { data, total },
    });
  } catch (error) {
    dispatch({
      type: TODO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const toDoCreateAction = (DATA) => async (dispatch) => {
  try {
    dispatch({
      type: TODO_CREATE_REQUEST,
    });

    const { data } = await axios.post("/api/todo/create", DATA);
    dispatch({
      type: TODO_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TODO_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const toDoDeleteAction = (ID) => async (dispatch) => {
  try {
    dispatch({
      type: TODO_DELETE_REQUEST,
    });

    await axios.delete(`/api/todo/delete/${ID}`);
    dispatch({
      type: TODO_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TODO_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const toDoUpdateAction = (ID, DATA) => async (dispatch) => {
  try {
    dispatch({
      type: TODO_UPDATE_REQUEST,
    });

    const { data } = await axios.put(`/api/todo/update/${ID}`, DATA);
    dispatch({
      type: TODO_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TODO_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const toDoSingleAction = (ID) => async (dispatch) => {
  try {
    dispatch({
      type: TODO_SINGLE_TODO_REQUEST,
    });

    const { data } = await axios.get(`/api/todo/get/${ID}`);
    dispatch({
      type: TODO_SINGLE_TODO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TODO_SINGLE_TODO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
