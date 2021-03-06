import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage } from "../../helpers/message";
import { listUsersAction } from "../../redux/actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listUsersAction());
    } else {
      history.push("/login");
    }
  }, [history, dispatch, userInfo]);

  return (
    <div className="container  p-5">
      <h1 className="text-center mb-5">List of Employees</h1>
      {loading ? (
        showLoading()
      ) : error ? (
        showErrorMessage(error)
      ) : (
        <table>
          <thead>
            <tr>
              <th> S/N</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>DEPARTMENT</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>
                  <Link to={`mailto:${user.email}`}>{user.email}</Link>
                </td>
                <td>{user.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserListScreen;
