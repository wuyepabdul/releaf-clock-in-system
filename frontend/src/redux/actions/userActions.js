import axios from "axios";
import { setLocalStorage } from "../../helpers/localStorage";
import { CLOCK_IN_RESET } from "../constants/clockinConstants";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

//user register action
export const registerAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    //content type to be sent to server
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // send request to server with user details and content type
    const { data } = await axios.post("/api/auth/register", userData, config);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    //login user
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    setLocalStorage("userInfo", data);
  } catch (error) {
    // handle error
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// user login action
export const loginAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    //content type to be sent to server
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // send request to server with user details and content type
    const { data } = await axios.post("/api/auth/login", userData, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    setLocalStorage("userInfo", data);
  } catch (error) {
    // handle error
    console.log(error.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get user details action
export const getUserDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    // get user details from redux store
    const {
      userLogin: { userInfo },
    } = getState();

    // send content type and set headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // send request
    const { data } = await axios.get(`/api/staff/profile`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    // handle error
    console.log("getUserDetailsAction error", error.message);
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// update user profile action
export const updateUserProfileAction =
  (userData) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

      // get user details from redux store
      const {
        userLogin: { userInfo },
      } = getState();

      // to send content type and set headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // send request
      const { data } = await axios.put("/api/staff/profile", userData, config);

      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      setLocalStorage("userInfo", data);
    } catch (error) {
      // handle error
      console.log(error.message);
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//list all users action
export const listUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    // get loggedIn user info
    const {
      userLogin: { userInfo },
    } = getState();

    // set headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // send request to server
    const { data } = await axios.get("/api/staff/list", config);
    console.log("data", data);
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    // handle error
    console.log(error.message);
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// logout action
export const logoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: CLOCK_IN_RESET });
  dispatch({ type: USER_REGISTER_RESET });
};
