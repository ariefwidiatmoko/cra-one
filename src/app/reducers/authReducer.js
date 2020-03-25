import { AUTH_LOGIN, AUTH_LOGOUT } from "../actions/auth/authConstant";
import { createReducer } from "../common/util/reducerUtils";

const initialState = { isAuth: false, token: null, userId: null, name: null, email: null };

const authLogin = (state, payload) => {
  return { ...state, ...payload.auth };
};

const authLogout = state => {
  return { ...state, isAuth: false, token: null, userId: null, name: null, email: null };
};

export default createReducer(initialState, {
  [AUTH_LOGIN]: authLogin,
  [AUTH_LOGOUT]: authLogout
});
