import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  staffClockinReducer,
  staffClockoutReducer,
} from "./reducers/clockinReducer";

import {
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  staffClockin: staffClockinReducer,
  staffClockout: staffClockoutReducer,
});

// set default user state in local storage and redux store
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// redux initial state
const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

// redux middleware
const middlewares = [thunk];

//create store
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
