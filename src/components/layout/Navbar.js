import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const Navbar = () => {
  const [open, setOpen] = useState(false);

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

  return (
    <div className={classes.root}>
      <AppBar position='sticky'>
        <Toolbar>
          <Fragment>
            <Button onClick={toggleDrawer(true)} className={classes.navButton}>
              <Typography variant='h5'>
                <MenuIcon className={classes.navIcon} /> Browse
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

          <Button className={classes.navButton}>
            <Typography variant='h5'>Register</Typography>
          </Button>
          <Button className={classes.navButton}>
            <Typography variant='h5'>Login</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
