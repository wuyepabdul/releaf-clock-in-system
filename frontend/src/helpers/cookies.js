import Cookies from "js-cookie";

/* store user token in cookie */
export const setCookie = (key, value) => {
  Cookies.set(key, value, { expires: 1 });
};

export const getCookie = (key) => {
  return Cookies.get(key);
};

export const deleteCookie = (key) => {
  Cookies.remove(key);
};
