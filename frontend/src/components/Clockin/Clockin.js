import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingButton, showLoading } from "../../helpers/loading";
import {
  clockinAction,
  clockoutAction,
} from "../../redux/actions/clockinAction";
import { useHistory } from "react-router-dom";

const Clockin = () => {
  // get history
  const history = useHistory();

  // for dispatch action to redux store
  const dispatch = useDispatch();

  // get loggedIn user info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //get user clockin action
  const staffClockin = useSelector((state) => state.staffClockin);
  const {
    loading: clockinLoading,
    error: clockinError,
    clockin: clockinSuccess,
  } = staffClockin;

  //get user clockin action
  const staffClockout = useSelector((state) => state.staffClockout);
  const {
    loading: clockoutLoading,
    error: clockoutError,
    clockout: clockoutSuccess,
  } = staffClockout;

  // check if user is loggedIn on component mount
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  // handle clockin handler
  const handleClockin = (e) => {
    e.preventDefault();
    const staffId = { staffId: userInfo.staffId };
    dispatch(clockinAction(staffId));
  };

  // handle clockout handler
  const handleClockout = (e) => {
    e.preventDefault();
    const staffId = { staffId: userInfo.staffId };
    dispatch(clockoutAction(staffId));
  };

  //

  return (
    <div className="container">
      <div>
        <div className="row  h-80 d-flex justify-content-center align-items-center">
          <div className="col-md-8 mt-5 ">
            <form>
              {clockinSuccess && (
                <div className="alert alert-success">
                  {"You Have Clocked In for today"}
                </div>
              )}
              {clockinError && (
                <div className="alert alert-warning">{clockinError}</div>
              )}
              {clockoutSuccess && <div> {console.log("success")}</div>}
              {clockoutError && (
                <div className="alert alert-warning">{clockoutError}</div>
              )}
              <div className=" mb-3 ">
                <div>
                  <input
                    type="text"
                    name="staffId"
                    id="staffId"
                    className="form-control"
                    value={userInfo.staffId}
                    readOnly
                  />
                </div>
              </div>

              <div className="col mb-3 ">
                {clockinLoading ? (
                  showLoading()
                ) : (
                  <button
                    type="submit"
                    onClick={handleClockin}
                    className="btn btn-primary form-control"
                  >
                    Clock In
                  </button>
                )}
              </div>
              <div className="col mb-3 ">
                {clockoutLoading ? (
                  loadingButton()
                ) : (
                  <button
                    type="submit"
                    onClick={handleClockout}
                    className="btn btn-warning form-control"
                  >
                    Clock Out
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clockin;
