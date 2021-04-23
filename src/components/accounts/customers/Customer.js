import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Button, Grid, Tab, Typography } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';

import AddressCard from './AddressCard';
import Orders from '../shared/Orders';

const Customer = ({ customer, orders }) => {
  const { addresses } = customer;
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Typography variant='h2'>Your Account</Typography>
      <TabContext value={value}>
        <AppBar position='static'>
          <TabList onChange={handleChange} aria-label='simple tabs example'>
            <Tab label='Info' value='1' />
            <Tab label='Addresses' value='2' />
            <Tab label='Orders' value='3' />
          </TabList>
        </AppBar>
        <TabPanel value='1'>Item One</TabPanel>
        <TabPanel value='2'>
          <Button>Add New Address</Button>
          <br />
          <br />
          <Grid container spacing={3}>
            {addresses.map(address => (
              <Grid item xs='4'>
                <AddressCard address={address} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value='3'>
          <Orders orders={orders} />
        </TabPanel>
      </TabContext>
    </div>
  );
};

Customer.propTypes = {
  customer: PropTypes.object.isRequired
};

export default Customer;
