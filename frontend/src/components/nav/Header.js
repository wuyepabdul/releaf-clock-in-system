import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { logout } from "../../api/logout";

const Header = () => {
  const history = useHistory();
  // staffInfo from local storage
  const staffInfo = JSON.parse(localStorage.getItem("staffInfo"));

  // logout handler
  const handleLogout = () => {
    logout();
    history.push("/login");
  };
  /* useEffect(() => {
     
  }, [input]) */
  return (
    <div>
      <nav className="navbar navbar-light navbar-expand-md bg-faded justify-content-center">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex w-50 me-auto">
            Releaf Clock-In
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsingNavbar3"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="navbar-collapse collapse w-100"
            id="collapsingNavbar3"
          >
            <ul className="navbar-nav w-100 justify-content-center">
              <form className="d-flex pt-2">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </ul>
            <ul className="nav navbar-nav ms-auto w-100 justify-content-end">
              {staffInfo === null ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>{" "}
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarScrollingDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Staff
                    </Link>
                    <ul
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="navbarScrollingDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="#">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          onClick={handleLogout}
                          to="#"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>{" "}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Header);
