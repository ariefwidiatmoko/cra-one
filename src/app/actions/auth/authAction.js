import { AUTH_LOGIN, AUTH_LOGOUT } from "./authConstant";

export const authLogin = auth => {
  return {
    type: AUTH_LOGIN,
    payload: {
      auth
    }
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT
  };
};
