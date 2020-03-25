// class AuthApi {
//   static postAuthLogin(event, authData) {
//     return fetch("http://localhost:3000/api/auth/login", {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: authData.email,
//           password: authData.password
//         })
//       })
//       .then(res => {
//         if (res.status === 422) {
//           throw new Error('Validation failed.');
//         }
//         if (res.status !== 200 && res.status !== 201) {
//           console.log('Error!');
//           throw new Error('Could not authenticate you!');
//         }
//         return res.json();
//       })
//       .then(resData => {
//         console.log(resData);
//         this.setState({
//           isAuth: true,
//           token: resData.token,
//           authLoading: false,
//           userId: resData.userId
//         });
//         localStorage.setItem('token', resData.token);
//         localStorage.setItem('userId', resData.userId);
//         const remainingMilliseconds = 60 * 60 * 1000;
//         const expiryDate = new Date(
//           new Date().getTime() + remainingMilliseconds
//         );
//         localStorage.setItem('expiryDate', expiryDate.toISOString());
//         this.setAutoLogout(remainingMilliseconds);
//       })
//       .catch(err => {
//         console.log(err);
//         this.setState({
//           isAuth: false,
//           authLoading: false,
//           error: err
//         });
//       });
//   }
// }

// export default AuthApi;

import { authLogin, authLogout } from "../actions/auth/authAction";
import { asyncActionFinish, asyncActionError } from "../async/asyncActions";
import { ASYNC_ACTION_START } from "../async/asyncConstants";

export const postAuthLogin = creds => {
  return async dispatch => {
    dispatch({ type: ASYNC_ACTION_START, payload: "login" });
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: creds.email,
        password: creds.password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        return res.json();
      })
      .then(resData => {
        const authData = {
          isAuth: true,
          token: resData.token,
          userId: resData.userId,
          name: resData.name,
          email: resData.email
        };
        dispatch(authLogin(authData));
        dispatch(asyncActionFinish());
      })
      .catch(err => {
        console.log(err);
        dispatch(asyncActionError());
      });
  };
};

export const postAuthLogout = (userId, elementName) => {
  return async dispatch => {
    dispatch({ type: ASYNC_ACTION_START, payload: elementName });
    fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId
      })
    }).then(res => {
      if (res.status === 422) {
        throw new Error("Logout failed");
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log("Error!");
        throw new Error("Could not logout you!");
      }
      dispatch(authLogout());
      dispatch(asyncActionFinish());
      return res.json();
    });
  };
};
