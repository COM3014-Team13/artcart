import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, currentUser, loadUser, logout } = authContext;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

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
        <MenuItem onClick={handleClose}>
          <Link to='/account' className={classes.link}>
            Account
          </Link>
        </MenuItem>
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
      </Menu>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position='sticky'>
        <Toolbar>
          <Fragment>
            <Button onClick={toggleDrawer(true)} className={classes.navButton}>
              <Typography variant='h5'>
                <MenuIcon className={classes.navIcon} /> {desktop && 'Browse'}
              </Typography>
            </Button>
            <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
              <List>
                <ListItem>
                  <ListItemText primary='Hello' />
                </ListItem>
              </List>
            </Drawer>
          </Fragment>

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
