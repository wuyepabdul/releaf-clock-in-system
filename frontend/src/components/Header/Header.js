import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { logoutAction } from "../../redux/actions/userActions";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import PeopleIcon from "@material-ui/icons/People";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import MoreIcon from "@material-ui/icons/MoreVert";
import { ExitToApp, ListAlt } from "@material-ui/icons";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  textColor: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    color: "white",

    "&:hover": {
      color: "white",
      textDecoration: "none",
    },
  },
  mobileTextColor: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    color: "black",

    "&:hover": {
      color: "black",
      textDecoration: "none",
    },
  },
  leftPadding: {
    paddingLeft: "3px",
  },

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logoutAction());
    history.push("/login");
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {userInfo && !userInfo.isAdmin ? (
        <div>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Link to="/profile" className={classes.mobileTextColor}>
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton
              aria-label="listStaff"
              aria-haspopup="true"
              color="inherit"
            >
              <ListAlt />
            </IconButton>

            <Link to="/staff/list" className={classes.mobileTextColor}>
              List Users
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="logout" color="inherit">
              <ExitToApp />
            </IconButton>

            <Link
              to="#"
              onClick={logoutHandler}
              className={classes.mobileTextColor}
            >
              Logout
            </Link>
          </MenuItem>
        </div>
      ) : (
        <Fragment>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <ExitToApp />
            </IconButton>

            <Link to="/login" className={classes.mobileTextColor}>
              SignIn
            </Link>
          </MenuItem>
        </Fragment>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {userInfo && !userInfo.isAdmin ? (
        <Fragment>
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <HomeIcon />
            </IconButton>

            <Link to="/" className={classes.mobileTextColor}>
              Home
            </Link>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Link to="/profile" className={classes.mobileTextColor}>
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton
              aria-label="listStaff"
              aria-haspopup="true"
              color="inherit"
            >
              <ListAlt />
            </IconButton>

            <Link to="/staff/list" className={classes.mobileTextColor}>
              List Users
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="logout" color="inherit">
              <ExitToApp />
            </IconButton>

            <Link
              to="/login"
              onClick={logoutHandler}
              className={classes.mobileTextColor}
            >
              Logout
            </Link>
          </MenuItem>
        </Fragment>
      ) : userInfo && userInfo.isAdmin ? (
        <>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <ExitToApp />
            </IconButton>

            <Link to="#" className={classes.mobileTextColor}>
              Admin
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <PeopleIcon />
            </IconButton>

            <Link to="/admin/userList" className={classes.mobileTextColor}>
              Users
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <PeopleIcon />
            </IconButton>

            <Link to="/admin/productList" className={classes.mobileTextColor}>
              Products
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <PeopleIcon />
            </IconButton>

            <Link to="/admin/orderList" className={classes.mobileTextColor}>
              Orders
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="login" color="inherit">
              <ExitToApp />
            </IconButton>

            <Link onClick={logoutHandler} className={classes.mobileTextColor}>
              Logout
            </Link>
          </MenuItem>
        </>
      ) : (
        <Fragment>
          <MenuItem>
            <IconButton
              aria-label="register"
              aria-haspopup="true"
              color="inherit"
            >
              <ExitToApp />
            </IconButton>

            <Link to="/register" className={classes.mobileTextColor}>
              Create Account
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="login" aria-haspopup="true" color="inherit">
              <ExitToApp />
            </IconButton>

            <Link to="/login" className={classes.mobileTextColor}>
              SignIn
            </Link>
          </MenuItem>
        </Fragment>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Releaf-Clock-In
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuItem>
              <Typography>
                <Link className={classes.textColor} to="#">
                  About
                </Link>
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography>
                <Link className={classes.textColor} to="/register">
                  Create Account
                </Link>
              </Typography>
            </MenuItem>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {userInfo ? (
                <>
                  <MenuItem>
                    <Typography>
                      <Link className={classes.textColor} to="/">
                        Home
                      </Link>
                    </Typography>
                  </MenuItem>
                  <AccountCircle />
                </>
              ) : (
                <MenuItem>
                  <Typography>
                    <Link className={classes.textColor} to="/login">
                      Signin
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
export default withRouter(Header);
