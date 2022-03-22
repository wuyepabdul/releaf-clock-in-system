import React, { useEffect } from "react";
import "./home.css";
import GetCurrentTime from "../../components/GetCurrentTime/GetCurrentTime";
import Clockin from "../../components/Clockin/Clockin";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ListClockins from "../../components/Clockin/ListClockins/ListClockins"

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
    <div className="container">
      <div className="col">
          <h1>
            <GetCurrentTime />
          </h1>
        </div>
     <div className='row'>
       
        <div className="col-md-5 col-sm-6">
          <Clockin />
        </div>
        <div className="col-md-7 col-sm-6">
        <ListClockins />
        </div>
     </div>
    </div>
  );
};

export default HomeScreen;
