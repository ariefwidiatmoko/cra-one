import { GET_PROFILE } from "./profileConstant";

export const getProfile = profile => {
  return {
    type: GET_PROFILE,
    payload: {
      profile
    }
  };
};
