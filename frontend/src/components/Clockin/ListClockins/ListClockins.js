import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading } from "../../../helpers/loading";
import { getAllClockinsAction } from "../../../redux/actions/clockinAction";

const ListClockins = () => {
  const dispatch = useDispatch()

  const {allClockins} = useSelector((state)=>state)
  const {loading, clockins} = allClockins
  useEffect(()=>{
    dispatch(getAllClockinsAction())
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
          {clockins && console.log('clockins',clockins)}
          <tbody>
            {clockins
              ? clockins.clockins.map((clockin, index)=>(
                <tr key={clockin.staff._id}>
                <td>{index + 1}</td>
                <td>{clockin.clockedIn ? <i className="fas fa-check text-success"> true </i> : <i className="far fa-exclamation-circle text-warning"></i>}</td>
                <td>{clockin.clockedIn ? <i className="fas fa-check text-success"> </i> : <i className="far fa-exclamation-circle text-warning"></i>}</td>
                <td>
                  {new Date(clockin.createdAt).getHours()}:
                  {new Date(clockin.createdAt).getMinutes()}
                  {new Date(clockin.createdAt).getHours() % 12 >= 12
                    ? "pm"
                    : "am"}
                </td>

                <td>
                  {" "}
                  {clockin.createdAt.toDateString()}
                </td>
              </tr>
              ))
              : showLoading()}
          </tbody>
        </table>
    </div>
  );
};

export default ListClockins;
