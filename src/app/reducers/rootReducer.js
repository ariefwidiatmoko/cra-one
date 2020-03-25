import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as toastrReducer } from "react-redux-toastr";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer"
import testReducer from "../reducers/testReducer";
import asyncReducer from "../async/asyncReducer";
import { persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'
// import postReducer from "../../menu/posts/postReducer"
// import modalReducer from "../../menu/modals/modalReducer";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["auth"]
};

const appReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  toastr: toastrReducer,
  test: testReducer,
  form: formReducer,
  async: asyncReducer
  // posts: postReducer,
  // modals: modalReducer,
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === "AUTH_LOGOUT") {
    state = initialState;
  }
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
