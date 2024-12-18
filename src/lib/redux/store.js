import { createStore, combineReducers, applyMiddleware } from "redux";
import { noteReducer } from "./reducers/noteReducer";
import { userReducer } from "./reducers/userReducer";
import { thunk } from "redux-thunk";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";

const rootReducer = combineReducers({
  notes: noteReducer,
  user: userReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevToolsDevelopmentOnly(applyMiddleware(thunk))
);

export default store;
