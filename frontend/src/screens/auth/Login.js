import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { showLoading } from "../../utils/loader";
import { login } from "../../api/apiCalls";
import { toast } from "react-toastify";
import { TextField } from "@material-ui/core";

const Login = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // staff data from local storage
  const staffInfo = JSON.parse(localStorage.getItem("staffInfo"));

  // component states
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let infoLoaded = true;
    if (staffInfo) {
      history.push(redirect);
      infoLoaded = false;
    }
    return () => {
      infoLoaded = false;
    };
  }, [redirect, history, staffInfo]);

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { staffId, password };
    setLoading(true);
    login(userData)
      .then((response) => {
        // store staff info local storage
        console.log(response);
        // localStorage.setItem("staffInfo", JSON.stringify(response));
        // history.push("/");

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("err", error);
        // toast.error(error.message);
        setStaffId("");
        setPassword("");
      });
  };

  // login form
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <h2 className=" mt-3 text-center">Sign-In</h2>

      <div className="input-fields ">
        <TextField
          id="staffId"
          name="staffId"
          label="Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          fullWidth={true}
        />
      </div>
      <div className="input-fields mt-3">
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth={true}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-4 form-control"
        disabled={!staffId || password.length < 6}
      >
        {" "}
        Login
      </button>
      <h6 className="text-center mt-2">
        {" "}
        Don't Have an Account? <Link to="signup">Create One</Link>{" "}
      </h6>
    </form>
  );

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-sm-4"></div>
        <div className="col-md-4">
          {loading && showLoading()}
          {loginForm()}
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
};

export default Login;
