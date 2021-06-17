import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { showLoading } from "../../utils/loader";
import { register } from "../../api/apiCalls";
import { TextField } from "@material-ui/core";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
const Register = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // staff data from local storage
  const staffInfo = JSON.parse(localStorage.getItem("staffInfo"));

  // component states
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    age: "",
    maritalStatus: "",
  });
  const { name, email, password, department, age, maritalStatus } = userData;
  // component state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (staffInfo) {
      history.push(redirect);
    }
  }, [redirect, history, staffInfo]);

  // handle change
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
      loading: false,
    });
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email, password, department, age, maritalStatus };
    setLoading(true);
    register(userData)
      .then((response) => {
        console.log("res", response);
        localStorage.setItem("staffInfo", JSON.stringify(response));
        toast.success("Registration Successful");
        history.push("/");
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Error occured");
        setLoading(false);
        // toast.error(error.response.message)
      });
  };

  // login form
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <h2 className=" mt-3 text-center">Sign-In</h2>

      <div className="input-fields ">
        <TextField
          id="name"
          name="name"
          label=" Name"
          value={name}
          onChange={handleChange}
          fullWidth={true}
        />
      </div>
      <div className="input-fields mt-3">
        <TextField
          id="email"
          name="email"
          label="Email Address"
          value={email}
          onChange={handleChange}
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
          onChange={handleChange}
          fullWidth={true}
        />
      </div>

      <div className="input-fields mt-3">
        <TextField
          id="department"
          name="department"
          label="Work Department"
          value={department}
          onChange={handleChange}
          fullWidth={true}
        />
      </div>
      <div className="input-fields mt-3">
        <TextField
          id="age"
          name="age"
          label="Age"
          value={age}
          onChange={handleChange}
          fullWidth={true}
        />
      </div>
      <div className="input-fields mt-3">
        <TextField
          id="marital_status"
          name="marital_status"
          label="Marital Status "
          value={maritalStatus}
          onChange={handleChange}
          fullWidth={true}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-4 form-control"
        disabled={!name || !email || password.length < 6}
      >
        {" "}
        Register
      </button>
      <h6 className="text-center mt-2">
        {" "}
        Don't Have an Account? <Link to="signup">Create One</Link>{" "}
      </h6>
    </form>
  );

  return (
    <div>
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

export default Register;
