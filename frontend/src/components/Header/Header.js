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
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { ExitToApp, ListAlt } from "@material-ui/icons";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({
  textColor: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    color: "white",
    textDecoration: "none",

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
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Link to="/" className={classes.mobileTextColor}>
              Home
            </Link>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Link to="/profile" className={classes.mobileTextColor}>
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="listStaff" color="inherit">
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
            <IconButton aria-label="login" color="inherit">
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
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Link to="/" className={classes.mobileTextColor}>
              Home
            </Link>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Link to="/profile" className={classes.mobileTextColor}>
              Profile
            </Link>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="listStaff" color="inherit">
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
      ) : (
        <Fragment>
          <MenuItem>
            <IconButton aria-label="register" color="inherit">
              <ExitToApp />
            </IconButton>

            <Link to="/register" className={classes.mobileTextColor}>
              Create Account
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/login" className={classes.mobileTextColor}>
              SignIn
            </Link>
          </MenuItem>
        </Fragment>
      )}
    </Menu>
  );

  return (
    <div data-test="headerComponent" className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            data-test="headerComponent"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link className={classes.textColor} to="/">
              Releaf-Clock-In
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-controls={menuId}
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {userInfo ? (
                <>
                  <AccountCircle />
                </>
              ) : (
                <>
                  <MenuItem>
                    <Typography>
                      <Link className={classes.textColor} to="/login">
                        Signin
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography>
                      <Link className={classes.textColor} to="/register">
                        Create Record
                      </Link>
                    </Typography>
                  </MenuItem>
                </>
              )}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
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
