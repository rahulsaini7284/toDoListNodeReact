import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  toDoCreateReducer,
  toDoDeleteReducer,
  toDoListReducer,
  toDoSingleReducer,
  toDoUpdateReducer,
} from "./reducers/toDoListReducer";

const middleware = [thunk];

const reducer = combineReducers({
  toDoList: toDoListReducer,
  toDoCreate: toDoCreateReducer,
  toDoSingle: toDoSingleReducer,
  toDoDelete: toDoDeleteReducer,
  toDoUpdate: toDoUpdateReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
