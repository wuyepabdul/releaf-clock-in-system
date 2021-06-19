import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const RedirectToHome = ({ history }) => {
  useEffect(() => {
    history.push("/login");
  }, [history]);

  return <div></div>;
};

export default withRouter(RedirectToHome);
