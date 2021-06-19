import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import RedirectToHome from "./RedirectToHome";

const UserRoute = ({ children, ...rest }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;

  return userInfo && userInfo.token ? (
    <Route {...rest} />
  ) : (
    <div>
      {" "}
      <RedirectToHome />{" "}
    </div>
  );
};

export default UserRoute;
