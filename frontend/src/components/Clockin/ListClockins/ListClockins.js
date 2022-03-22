import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading } from "../../../helpers/loading";
import { getAllClockinsAction } from "../../../redux/actions/clockinAction";

const ListClockins = () => {
  const dispatch = useDispatch();

  const { allClockins } = useSelector((state) => state);
  const { clockins } = allClockins;
  useEffect(() => {
    dispatch(getAllClockinsAction());
  }, [dispatch]);
  return (
    <div>
      <h4 className="text-center">Clock Ins</h4>
      <table className="table">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Staff</th>
            <th>Clock in</th>
            <th>Clock out</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {clockins
            ? clockins.map((clockin, index) => (
                <tr key={clockin.staff._id}>
                  <td>{index + 1}</td>
                  <td>{clockin.staff.name}</td>
                  <td>
                    {clockin.clockedIn ? new Date(clockin.clockedInAt).toLocaleTimeString() : (
                      <i className="fas fa-exclamation-circle text-warning"></i>
                    )}
                  </td>
                  <td>
                    {clockin.clockedOut ? new Date(clockin.clockedOutAt).toLocaleTimeString() : (
                      <i className="fas fa-exclamation-circle text-danger text-center"></i>
                    )}
                    {}
                  </td>
               

                  <td> {new Date(clockin.createdAt).toDateString()}</td>
                </tr>
              ))
            : showLoading()}
        </tbody>
      </table>
    </div>
  );
};

export default ListClockins;
