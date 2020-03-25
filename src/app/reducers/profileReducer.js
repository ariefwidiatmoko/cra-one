import { GET_PROFILE } from "../actions/profile/profileConstant";
import { createReducer } from "../common/util/reducerUtils";

const initialState = {};

const getProfile = (state, payload) => {
  return { ...state, ...payload.profile };
};

export default createReducer(initialState, {
  [GET_PROFILE]: getProfile
});
