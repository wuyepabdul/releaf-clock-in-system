import axios from "axios";
import {
  CLOCK_IN_FAIL,
  CLOCK_IN_REQUEST,
  CLOCK_IN_SUCCESS,
  CLOCK_OUT_FAIL,
  CLOCK_OUT_REQUEST,
  CLOCK_OUT_SUCCESS,
  GET_ALL_CLOCK_INS_REQUEST,
  GET_ALL_CLOCK_INS_SUCCESS,
  GET_ALL_CLOCK_INS_FAIL,
  GET_ALL_CLOCK_OUTS_REQUEST,
  GET_ALL_CLOCK_OUTS_SUCCESS,
  GET_ALL_CLOCK_OUTS_FAIL,
  GET_TODAYS_CLOCK_INS_REQUEST,
  GET_TODAYS_CLOCK_INS_SUCCESS,
  GET_TODAYS_CLOCK_INS_FAIL
} from "../constants/clockinConstants";

export const clockinAction = (staffId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLOCK_IN_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/staff/clockin", staffId, config);
    console.log('clockin data', data)
    dispatch({ type: CLOCK_IN_SUCCESS, payload: data });
    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log('error',error.message)
    dispatch({
      type: CLOCK_IN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clockoutAction = (staffId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLOCK_OUT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/staff/clockout", staffId, config);

    dispatch({ type: CLOCK_OUT_SUCCESS, payload: data });
    // localStorage.setItem("userInfo", JSON.stringify(data));
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

export const getTodaysClockinsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_TODAYS_CLOCK_INS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/staff/todays-clockins", config);
    dispatch({ type: GET_TODAYS_CLOCK_INS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_TODAYS_CLOCK_INS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getAllClockinsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_CLOCK_INS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/staff/clockins", config);
    dispatch({ type: GET_ALL_CLOCK_INS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_ALL_CLOCK_INS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllClockoutsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_CLOCK_OUTS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/staff/clockouts", config);

    dispatch({ type: GET_ALL_CLOCK_OUTS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_ALL_CLOCK_OUTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
