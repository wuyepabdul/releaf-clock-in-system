import React, { useEffect } from "react";
import "./home.css";
import GetCurrentTime from "../../components/GetCurrentTime/GetCurrentTime";
import Clockin from "../../components/Clockin/Clockin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TodayClockins from "../../components/Clockin/ListClockins/TodayClockins";

const HomeScreen = () => {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo === null) {
      navigate("/login");
    }
  }, [userInfo, navigate]);
  return (
    <div className="container">
      <div className="row text-center">
            <GetCurrentTime />
        </div>
     <div className='row'>
        <div className="col-md-5 col-sm-6">
          <Clockin />
        </div>
        <div className="col-md-7 col-sm-6">
        <h3 className="text-center">Today's Clock Ins</h3>
        <TodayClockins />
        </div>
     </div>
    </div>
  );
};

export default HomeScreen;
