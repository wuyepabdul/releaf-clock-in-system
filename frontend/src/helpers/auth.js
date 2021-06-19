import { setCookie, deleteCookie } from "./cookies";
import {
  deleteLocalStorage,
  getUserLocalStorage,
  setUserLocalStorage,
} from "./localStorage";

export const setAuthentication = (token, user) => {
  setCookie("token", token);
  setUserLocalStorage("user", user);
};

export const isAuthenticated = () => {
  if (getUserLocalStorage("user")) {
    return getUserLocalStorage("user");
  } else {
    return false;
  }
};

export const logout = () => {
  deleteLocalStorage("user");
  deleteCookie("token");
};
