import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingButton } from "../../helpers/loading";
import { loginAction } from "../../redux/actions/userActions";
import { isEmpty } from "validator";
import Meta from "../../components/Meta/Meta";
import { toast } from "react-toastify";
import AlertError from "../../components/Alerts/AlertError";

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = { email, password };
    if (isEmpty(email) || isEmpty(password)) {
      toast.error("All fields are required");
    } else {
      dispatch(loginAction(userData));
    }
  };
  return (
    <div className="container ">
      <Meta title={"Login Page"} />
      <h1 className="text-center mt-2">Sign In</h1>

      <div>
        <div className="row  h-80 d-flex justify-content-center align-items-center">
          <div className="col-md-6 mt-5 ">
            {error && <AlertError alertMessage={error} />}
            <form onSubmit={submitHandler}>
              <div className="col mb-3 ">
                <label for="email" className=" form-label">
                  Email
                </label>
                <div>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col mb-3 ">
                <label for="password" className="form-label">
                  Password
                </label>
                <div className=" l">
                  <input
                    id="password"
                    name="password"
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="col mb-3 ">
                {loading ? (
                  loadingButton()
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary form-control"
                    disabled={password.length < 4 || !email}
                  >
                    Login
                  </button>
                )}
                <div className="mt-4">
                  Don't Have an Account? <Link to="/register">Register</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
