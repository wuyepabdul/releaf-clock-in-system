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
  CLOCK_IN_RESET,
  CLOCK_OUT_RESET
} from "../constants/clockinConstants";

export const staffClockinReducer = (state = [], action) => {
  switch (action.type) {
    case CLOCK_IN_REQUEST:
      return { loading: true };
    case CLOCK_IN_SUCCESS:
      return {
        loading: false,
        clockin: action.payload,
        success: "Clocked In ",
      };
    case CLOCK_IN_FAIL:
      return { loading: false, error: action.payload };
    case CLOCK_IN_RESET:
      return {loading:false, error:false, success:false}
    default:
      return state;
  }
};

export const staffClockoutReducer = (state = [], action) => {
  switch (action.type) {
    case CLOCK_OUT_REQUEST:
      return { loading: true };
    case CLOCK_OUT_SUCCESS:
      return {
        loading: false,
        clockin: action.payload,
        success: "Clocked Out ",
      };
    case CLOCK_OUT_FAIL:
      return { loading: false, error: action.payload };
     case CLOCK_OUT_RESET:
      return {loading:false, error:false, success:false}
    default:
      return state;
  }
};

export const allClockoutsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CLOCK_OUTS_REQUEST:
      return { loading: true };
    case GET_ALL_CLOCK_OUTS_SUCCESS:
      return {
        loading: false,
        clockouts: action.payload
      };
    case GET_ALL_CLOCK_OUTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const allClockinsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_CLOCK_INS_REQUEST:
      return { loading: true };
    case GET_ALL_CLOCK_INS_SUCCESS:
      return {
        loading: false,
        clockins: action.payload
      };
    case GET_ALL_CLOCK_INS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};