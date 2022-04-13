import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmail, isEmpty } from "validator";
import { registerAction } from "../../redux/actions/userActions";
import { loadingButton } from "../../helpers/loading";
import { USER_REGISTER_RESET } from "../../redux/constants/userConstants";
import AlertError from "../../components/Alerts/AlertError";
import { tokenIsExpired } from "../../helpers/auth";

const RegisterScreen = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const currentTime = new Date().getTime();

  useEffect(() => {
    dispatch({ type: USER_REGISTER_RESET });
    if ( userInfo && !tokenIsExpired(userInfo.token, currentTime)) {
      navigate("/");
    }
  }, [navigate, dispatch, userInfo, currentTime]);

 
  const submitHandler = (e) => {
    e.preventDefault();

    const userData = { name, email, password, department };
    if (
      isEmpty(name) ||
      isEmpty(password) ||
      isEmpty(email) ||
      isEmpty(department)
    ) {
      setMessage("All fields are required");
    } else if (!isEmail(email)) {
      setMessage("Please provide a valid email");
    } else {
      dispatch(registerAction(userData));
    }
  };

  return (
    <div className="container ">
      <h1 className="text-center mt-2">Create Account</h1>

      <div>
        <div className="row  h-80 d-flex justify-content-center align-items-center">
          <div className="col-md-6 mt-3 ">
            {error && <AlertError alertMessage={error} />}
            {message && <AlertError alertMessage={message} />}
            <form onSubmit={submitHandler}>
              <div className="col mb-3 ">
                <label htmlFor="name" className=" form-label">
                  Name
                </label>
                <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col mb-3 ">
                <label htmlFor="email" className=" form-label">
                  Email
                </label>
                <div>
                  <input
                    type="email"
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
                <label htmlFor="password" className="form-label">
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
                <label htmlFor="department" className=" form-label">
                  Department
                </label>
                <div>
                  <input
                    type="text"
                    name="department"
                    id="department"
                    className="form-control"
                    placeholder="Department "
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
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
                  >
                    Create Record
                  </button>
                )}
                <div className="mt-4">
                  Have an Account? <Link to="/login">Login here</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
