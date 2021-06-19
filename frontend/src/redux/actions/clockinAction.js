import axios from "axios";
import {
  CLOCK_IN_FAIL,
  CLOCK_IN_REQUEST,
  CLOCK_IN_SUCCESS,
  CLOCK_OUT_FAIL,
  CLOCK_OUT_REQUEST,
  CLOCK_OUT_SUCCESS,
} from "../constants/clockinConstants";
import { USER_DETAILS_SUCCESS } from "../constants/userConstants";

// clockin action
export const clockinAction = (staffId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLOCK_IN_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    // set headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //send request
    const { data } = await axios.put("/api/staff/clockin", staffId, config);
    dispatch({ type: CLOCK_IN_SUCCESS, payload: data });
    // localStorage.setItem("userInfo", JSON.stringify(data));
    // dispatch({ type: CLOCK_IN_SUCCESS, payload: data });
  } catch (error) {
    console.log("error clckin", error);
    dispatch({
      type: CLOCK_IN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// staff clout action
export const clockoutAction = (staffId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLOCK_OUT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    // set headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //send request
    const { data } = await axios.put("/api/staff/clockout", staffId, config);
    console.log("clockout==>", data);

    dispatch({ type: CLOCK_OUT_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: CLOCK_OUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
