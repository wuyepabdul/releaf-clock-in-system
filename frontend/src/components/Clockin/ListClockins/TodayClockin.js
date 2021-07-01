import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./clockin.css";

const ListClockins = ({ history }) => {
  const todayDate = new Date();

  const userFromStorage = JSON.parse(localStorage.getItem("userInfo"));

  const [userInfo, setUserInfo] = useState({});

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo: userData } = userLogin;

  const checker = (arr) => {
    arr.find((c) => {
      c.createdAt = new Date(c.createdAt);
      if (c.createdAt.getDate() === todayDate.getDate()) {
        console.log("true");
      } else {
        console.log("false");
      }
    });
  };

  useEffect(() => {
    if (!userData) {
      history.push("/login");
    } else {
      setUserInfo(userData);
    }
  }, [userData]);
  return (
    <div className="mt-5">
      <h4 className="center-text"> Today's Clock In</h4>
      <hr />
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td>{userInfo.name}</td>
            <td>{userInfo.department}</td>
            <td>
              {checker(userFromStorage.clockIns) ? (
                <i className="fas fa-check"> </i>
              ) : (
                <i className="fas fa-times"> </i>
              )}
            </td>
            <td>
              {checker(userFromStorage.clockIns) ? (
                <i className="fas fa-check"> </i>
              ) : (
                <i className="fas fa-times"> </i>
              )}
            </td>
            <td></td>
            <td>
              {checker(userFromStorage.clockIns) ? (
                <small>
                  {" "}
                  {userInfo.clockOuts.createdAt.getHour()}:{" "}
                  {userInfo.clockOuts.createdAt.getMinute()}{" "}
                </small>
              ) : (
                <i className="fas fa-times"> </i>
              )}
            </td>
            <td>
              {todayDate.getDate()}/{todayDate.getMonth()} /{" "}
              {todayDate.getFullYear()}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListClockins;
