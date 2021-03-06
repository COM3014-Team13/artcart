import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, currentUser, loadUser, logout } = authContext;
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  const desktop = useMediaQuery({
    query: '(min-width: 800px)'
  });

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    spacer: {
      flexGrow: 1,
      margin: 'auto'
    },
    navButton: {
      color: 'white',
      textTransform: 'none'
    },
    navIcon: {
      verticalAlign: '-3px'
    },
    link: {
      color: 'black',
      textDecoration: 'none'
    }
  }));

  const classes = useStyles();

  const desktopLinks = (
    <Fragment>
      {isAuthenticated ? (
        <Fragment>
          <Typography variant='h5'>
            {'Welcome, ' + currentUser.user.name}
          </Typography>
          <Link to='/account' className={classes.link}>
            <Button className={classes.navButton}>
              <Typography variant='h5'>Account</Typography>
            </Button>
          </Link>
          <Button className={classes.navButton} onClick={logout}>
            <Typography variant='h5'>Logout</Typography>
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <Link to='/register' className={classes.link}>
            <Button className={classes.navButton}>
              <Typography variant='h5'>Register</Typography>
            </Button>
          </Link>
          <Link to='/login' className={classes.link}>
            <Button className={classes.navButton}>
              <Typography variant='h5'>Login</Typography>
            </Button>
          </Link>
        </Fragment>
      )}
    </Fragment>
  );

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const mobileLinks = (
    <Fragment>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <AccountCircleIcon
          style={{ color: 'white' }}
          className={classes.navIcon}
        />
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isAuthenticated ? (
          <Fragment>
            <MenuItem onClick={handleClose}>
              <Link to='/account' className={classes.link}>
                Account
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                logout();
              }}
            >
              Logout
            </MenuItem>
          </Fragment>
        ) : (
          <Fragment>
            <MenuItem onClick={handleClose}>
              <Link to='/register' className={classes.link}>
                Register
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to='/login' className={classes.link}>
                Login
              </Link>
            </MenuItem>
          </Fragment>
        )}
      </Menu>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position='sticky'>
        <Toolbar>
          <Box className={classes.spacer}></Box>

          <Box position='absolute' left='50%'>
            <Box position='relative' left='-50%'>
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                <Typography variant='h3'>ArtCart</Typography>
              </Link>
            </Box>
          </Box>
          {desktop ? desktopLinks : mobileLinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
