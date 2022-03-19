import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading } from "../../../helpers/loading";
import { listUsersAction } from "../../../redux/actions/userActions";

const ListClockins = () => {
  const dispatch = useDispatch()

  const {userList} = useSelector((state)=>state)
  const {users} = userList
  useEffect(()=>{
    dispatch(listUsersAction())
  },[dispatch])
  return (
    <div>
       <h4 className="text-center">Clock Ins</h4>
        <table className="table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Clock in</th>
              <th>Clock out</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {users
              ? users.map((user)=>(
                <tr key={user.email}>{
                  user.clockIns.map((clockin, index) => (
                    <tr key={clockin.clockedInAt}>
                      <td>{index + 1}</td>
                      <td>{clockin.clockedIn ? <i className="fas fa-check text-success"> </i> : <i className="far fa-exclamation-circle text-warning"></i>}</td>
                      <td>{clockin.clockedIn ? <i className="fas fa-check text-success"> </i> : <i className="far fa-exclamation-circle text-warning"></i>}</td>
                      <td>
                        {new Date(clockin.clockedInAt).getHours()}:
                        {new Date(clockin.clockedInAt).getMinutes()}
                        {new Date(clockin.clockedInAt).getHours() % 12 >= 12
                          ? "pm"
                          : "am"}
                      </td>
  
                      <td>
                        {" "}
                        {new Date(clockin.clockedInAt).getDay()}/
                        {new Date(clockin.clockedInAt).getMonth()} /
                        {new Date(clockin.clockedInAt).getFullYear()}
                      </td>
                    </tr>
                  ))
                }</tr>
              ))
              : showLoading()}
          {console.log('users', users)}
          
          </tbody>
        </table>
    </div>
  );
};

export default ListClockins;
