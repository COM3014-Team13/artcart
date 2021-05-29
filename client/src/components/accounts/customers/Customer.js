import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Grid,
  Modal,
  Tab,
  Typography
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';

import AddressCard from './AddressCard';
import AddressForm from './AddressForm';
import PasswordForm from '../shared/PasswordForm';
import Orders from '../../orders/Orders';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Customer = ({ currentUser }) => {
  const { user, addresses } = currentUser;
  const [value, setValue] = useState('1');
  const [modal, setModal] = useState({
    password: false,
    address: false
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Modal
        open={modal.password}
        onClose={() => {
          setModal({ ...modal, password: false });
        }}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <PasswordForm
          closePassword={() => {
            setModal({ ...modal, password: false });
          }}
        />
      </Modal>
      <Modal
        open={modal.address}
        onClose={() => {
          setModal({ ...modal, address: false });
        }}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <AddressForm
          closeAddress={() => {
            setModal({ ...modal, address: false });
          }}
        />
      </Modal>
      <Typography variant='h2'>Your Account</Typography>
      <TabContext value={value}>
        <AppBar position='static'>
          <TabList onChange={handleChange} aria-label='simple tabs example'>
            <Tab label='Info' value='1' />
            <Tab label='Addresses' value='2' />
            <Tab label='Orders' value='3' />
          </TabList>
        </AppBar>
        <TabPanel value='1'>
          <Grid container spacing={3}>
            <Grid item xs={2} alignItems='right'>
              <AccountCircleIcon style={{ height: '5em', width: '100%' }} />
            </Grid>
            <Grid item xs={10}>
              <Typography variant='h4'>{user.name}</Typography>
              <Typography variant='h5' style={{ paddingLeft: '1em' }}>
                {user.email}
              </Typography>
              <br />
              <Button
                variant='contained'
                onClick={() => {
                  setModal({ ...modal, password: true });
                }}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value='2'>
          <Button
            variant='contained'
            onClick={() => {
              setModal({ ...modal, address: true });
            }}
          >
            Add New Address
          </Button>

          <br />
          <br />
          <Grid container spacing={3}>
            {addresses.map(address => (
              <Grid item xs={12} md={6} lg={4}>
                <AddressCard address={address} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value='3'>
          <Orders />
        </TabPanel>
      </TabContext>
    </div>
  );
};

Customer.propTypes = {
  user: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired
};

export default Customer;
