import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseURL from "../../../assets/api/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = (user, dispatch) => {
  console.log("user from login context == ", user);
  axios
    .get(
      `${baseURL}/post_login?session_token=${user.session_token}&user_id=${user.userId}`
    )
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const token = data.token;
        AsyncStorage.setItem("token", token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded, user)); // TODO
      } else {
        // TODO
        logoutUser(dispatch);
      }
    })
    .catch((error) => {
      console.log("error=", error);
      logoutUser(dispatch);
    });
};

export const getUserProfile = (token) => {
  axios
    .get(`${baseURL}/authenticate?token=${token}`)
    .then((res) => res.json())
    .then((data) => console.log("data=", data));
};

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem("token");
  dispatch(setCurrentUser({}));
};
export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
