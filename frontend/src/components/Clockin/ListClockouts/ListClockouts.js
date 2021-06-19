import React from "react";
import { showLoading } from "../../../helpers/loading";

const ListClockouts = ({ userInfo }) => {
  return (
    <div className="row">
      <div className="col-md-5">
        <h4 className="text-center">Clock Outs</h4>
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
              ? userInfo.clockOuts.map((clockout, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      {new Date(clockout.clockedOutAt).getHours()}:
                      {new Date(clockout.clockedOutAt).getMinutes()}
                      {new Date(clockout.clockedOutAt).getHours() % 12 >= 12
                        ? "pm"
                        : "am"}
                    </td>

                    <td>
                      {" "}
                      {new Date(clockout.clockedInAt).getDay()}/
                      {new Date(clockout.clockedInAt).getMonth()} /
                      {new Date(clockout.clockedInAt).getFullYear()}
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

export default ListClockouts;
