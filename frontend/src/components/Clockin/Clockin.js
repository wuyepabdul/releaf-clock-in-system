import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingButton, showLoading } from "../../helpers/loading";
import {
  clockinAction,
  clockoutAction,
  getAllClockinsAction,
  getTodaysClockinsAction,
} from "../../redux/actions/clockinAction";
import { useHistory } from "react-router-dom";
import AlertError from "../../components/Alerts/AlertError";
import AlertSuccess from "../../components/Alerts/AlertSuccess";
import {
  CLOCK_IN_RESET,
  CLOCK_OUT_RESET,
} from "../../redux/constants/clockinConstants";
import { resetMessage } from "../../helpers/reset";
const Clockin = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [staffClockinId, setStaffClockinId] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const staffClockin = useSelector((state) => state.staffClockin);
  const {
    loading: clockinLoading,
    error: clockinError,
    success: clockinSuccess,
  } = staffClockin;

  const staffClockout = useSelector((state) => state.staffClockout);
  const {
    loading: clockoutLoading,
    error: clockoutError,
    success: clockoutSuccess,
  } = staffClockout;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    setStaffClockinId(userInfo.staffId);
  }, [history, userInfo, dispatch]);

  const fetchClockins = () => {
    setTimeout(() => {
      dispatch(getTodaysClockinsAction());
    }, 1000);
  };

  const handleClockin = (e) => {
    e.preventDefault();
    const staffId = {
      staffId: staffClockinId,
    };
    dispatch(clockinAction(staffId));
    fetchClockins();
    resetMessage(dispatch, CLOCK_IN_RESET);
  };

  const handleClockout = (e) => {
    e.preventDefault();
    const staffId = { staffId: staffClockinId };
    dispatch(clockoutAction(staffId));
    fetchClockins();
    resetMessage(dispatch, CLOCK_OUT_RESET);
    
  };

  return (
    <div data-test="clockin-component" className="container">
      <form>
        {clockinSuccess && <AlertSuccess alertMessage={clockinSuccess} />}
        {clockinError && <AlertError alertMessage={clockinError} />}
        {clockoutSuccess && <AlertSuccess alertMessage={clockoutSuccess} />}
        {clockoutError && <AlertError alertMessage={clockoutError} />}
        <div className=" mb-3 ">
          <div>
            <label htmlFor="staffId" className=" form-label mb-3">
              Clockin with your StaffID
            </label>
            <input
              type="text"
              name="staffId"
              value={staffClockinId}
              onChange={(e) => setStaffClockinId(e.target.value)}
              id="staffId"
              placeholder="e.g, Emma_5935_RF"
              className="form-control text-center"
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
  );
};

export default Clockin;
