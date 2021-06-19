import React from "react";
import { showLoading } from "../../../helpers/loading";

const ListClockins = ({ userInfo }) => {
  return (
    <div className="row">
      <div className="col-md-5">
        <h4 className="text-center">Clock Ins</h4>
        <table className="table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>TIME</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {userInfo
              ? userInfo.clockIns.map((clockin, index) => (
                  <tr>
                    <td>{index + 1}</td>
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
              : showLoading()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListClockins;
