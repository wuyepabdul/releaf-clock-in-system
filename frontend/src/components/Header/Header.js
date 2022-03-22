// const Header = ({ history }) => {
//   const dispatch = useDispatch();

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const logoutHandler = () => {
//     dispatch(logoutAction());
//     history.push("/login");
//   };

//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const menuId = "primary-search-account-menu";

//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: "top", horizontal: "right" }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       {userInfo && !userInfo.isAdmin ? (
//         <div>
//           <MenuItem onClick={handleProfileMenuOpen}>
//             <IconButton
//               aria-label="account of current user"
//               aria-controls="primary-search-account-menu"
//               color="inherit"
//             >
//               <AccountCircle />
//             </IconButton>
//             <Link to="/" className={classes.mobileTextColor}>
//               Home
//             </Link>
//           </MenuItem>
//           <MenuItem onClick={handleProfileMenuOpen}>
//             <IconButton
//               aria-label="account of current user"
//               aria-controls="primary-search-account-menu"
//               color="inherit"
//             >
//               <AccountCircle />
//             </IconButton>
//             <Link to="/profile" className={classes.mobileTextColor}>
//               Profile
//             </Link>
//           </MenuItem>
//           <MenuItem>
//             <IconButton aria-label="listStaff" color="inherit">
//               <ListAlt />
//             </IconButton>

//             <Link to="/staff/list" className={classes.mobileTextColor}>
//               List Users
//             </Link>
//           </MenuItem>
//           <MenuItem>
//             <IconButton aria-label="logout" color="inherit">
//               <ExitToApp />
//             </IconButton>

//             <Link
//               to="#"
//               onClick={logoutHandler}
//               className={classes.mobileTextColor}
//             >
//               Logout
//             </Link>
//           </MenuItem>
//         </div>
//       ) : (
//         <Fragment>
//           <MenuItem>
//             <IconButton aria-label="login" color="inherit">
//               <ExitToApp />
//             </IconButton>

//             <Link to="/login" className={classes.mobileTextColor}>
//               SignIn
//             </Link>
//           </MenuItem>
//         </Fragment>
//       )}
//     </Menu>
//   );

//   const mobileMenuId = "primary-search-account-menu-mobile";
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{ vertical: "top", horizontal: "right" }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       {userInfo && !userInfo.isAdmin ? (
//         <Fragment>
//           <MenuItem onClick={handleProfileMenuOpen}>
//             <IconButton
//               aria-label="account of current user"
//               aria-controls="primary-search-account-menu"
//               color="inherit"
//             >
//               <AccountCircle />
//             </IconButton>
//             <Link to="/" className={classes.mobileTextColor}>
//               Home
//             </Link>
//           </MenuItem>
//           <MenuItem onClick={handleProfileMenuOpen}>
//             <IconButton
//               aria-label="account of current user"
//               aria-controls="primary-search-account-menu"
//               color="inherit"
//             >
//               <AccountCircle />
//             </IconButton>
//             <Link to="/profile" className={classes.mobileTextColor}>
//               Profile
//             </Link>
//           </MenuItem>
//           <MenuItem>
//             <IconButton aria-label="listStaff" color="inherit">
//               <ListAlt />
//             </IconButton>

//             <Link to="/staff/list" className={classes.mobileTextColor}>
//               List Users
//             </Link>
//           </MenuItem>
//           <MenuItem>
//             <IconButton aria-label="logout" color="inherit">
//               <ExitToApp />
//             </IconButton>

//             <Link
//               to="/login"
//               onClick={logoutHandler}
//               className={classes.mobileTextColor}
//             >
//               Logout
//             </Link>
//           </MenuItem>
//         </Fragment>
//       ) : (
//         <Fragment>
//           <MenuItem>
//             <IconButton aria-label="register" color="inherit">
//               <ExitToApp />
//             </IconButton>

//             <Link to="/register" className={classes.mobileTextColor}>
//               Create Account
//             </Link>
//           </MenuItem>
//           <MenuItem>
//             <Link to="/login" className={classes.mobileTextColor}>
//               SignIn
//             </Link>
//           </MenuItem>
//         </Fragment>
//       )}
//     </Menu>
//   );

//   return (
//     <div data-test="headerComponent" className={classes.grow}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             data-test="headerComponent"
//             color="inherit"
//             aria-label="open drawer"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography className={classes.title} variant="h6" noWrap>
//             <Link className={classes.textColor} to="/">
//               Releaf-Clock-In
//             </Link>
//           </Typography>
//           <div className={classes.grow} />
//           <div className={classes.sectionDesktop}>
//             <IconButton
//               edge="end"
//               aria-controls={menuId}
//               onClick={handleProfileMenuOpen}
//               color="inherit"
//             >
//               {userInfo ? (
//                 <>
//                   <AccountCircle />
//                 </>
//               ) : (
//                 <>
//                   <MenuItem>
//                     <Typography>
//                       <Link className={classes.textColor} to="/login">
//                         Signin
//                       </Link>
//                     </Typography>
//                   </MenuItem>
//                   <MenuItem>
//                     <Typography>
//                       <Link className={classes.textColor} to="/register">
//                         Create Record
//                       </Link>
//                     </Typography>
//                   </MenuItem>
//                 </>
//               )}
//             </IconButton>
//           </div>
//           <div className={classes.sectionMobile}>
//             <IconButton
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MoreIcon />
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>
//       {renderMobileMenu}
//       {renderMenu}
//     </div>
//   );
// };
// export default withRouter(Header);

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../redux/actions/userActions";

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logoutAction());
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                Link
              </Link>
            </li>
          </ul>
          {userInfo ? (
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                User Info
              </button>
              <ul className="dropdown-menu dropdown-menu-start dropdown-menu-lg-end">
                <li>
                  <Link className="dropdown-item" to="/"></Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item bg-warning"
                    type="button"
                    onClick={logoutHandler}
                    to="#"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              {" "}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/register" className="nav-link active" aria-current="page">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link active" aria-current="page">
                    Signin
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
