import { getProfile } from "../actions/profile/profileAction";
import { asyncActionFinish, asyncActionError } from "../async/asyncActions";
import { ASYNC_ACTION_START } from "../async/asyncConstants";

export const fetchProfile = (userId, token) => {
    return async dispatch => {
        dispatch({type: ASYNC_ACTION_START, payload: "getProfile"});
        fetch("http://localhost:3000/api/users/profile/" + userId, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status !== 200) {
              throw new Error('Failed to fetch status');
            }
            return res.json();
        })
        .then(resData => {
            const hobbies = resData.profile.hobbies;
            const arrHobbies = hobbies.split(',');
            const objHobbies = {hobbies: arrHobbies}
            const profile = {...resData.profile, ...objHobbies}
            dispatch(getProfile(profile));
            dispatch(asyncActionFinish());
        })
        .catch(err => {
            console.log(err);
            dispatch(asyncActionError());
        })
    }
}