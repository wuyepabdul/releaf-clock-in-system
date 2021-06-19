import {
  CLOCK_IN_FAIL,
  CLOCK_IN_REQUEST,
  CLOCK_IN_RESET,
  CLOCK_IN_SUCCESS,
  CLOCK_OUT_FAIL,
  CLOCK_OUT_REQUEST,
  CLOCK_OUT_SUCCESS,
} from "../constants/clockinConstants";

export const staffClockinReducer = (state = [], action) => {
  switch (action.type) {
    case CLOCK_IN_REQUEST:
      return { loading: true };
    case CLOCK_IN_SUCCESS:
      return { loading: false, clockin: action.payload, success: true };
    case CLOCK_IN_FAIL:
      return { loading: false, error: action.payload };
    case CLOCK_IN_RESET:
      return [];
    default:
      return state;
  }
};

export const staffClockoutReducer = (state = [], action) => {
  switch (action.type) {
    case CLOCK_OUT_REQUEST:
      return { loading: true };
    case CLOCK_OUT_SUCCESS:
      return { loading: false, clockin: action.payload, success: true };
    case CLOCK_OUT_FAIL:
      return { loading: false, error: action.payload };
    case CLOCK_IN_RESET:
      return [];
    default:
      return state;
  }
};
