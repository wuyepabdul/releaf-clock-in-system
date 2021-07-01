import React, { useEffect } from "react";
import "./home.css";
import Meta from "../../components/Meta/Meta";
import GetCurrentTime from "../../components/GetCurrentTime/GetCurrentTime";
import Clockin from "../../components/Clockin/Clockin";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const HomeScreen = () => {
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo === null) {
      history.push("/login");
    }
  }, [userInfo, history]);
  return (
    <div className="container  center-items">
      <Meta />
      <div>
        <h1>
          <GetCurrentTime />
        </h1>
      </div>
      <div>
        <h3> Welcome {userInfo.name} </h3>
      </div>
      <div>
        <Clockin />
      </div>
    </div>
  );
};

export default HomeScreen;
