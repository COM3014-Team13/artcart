import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from '@material-ui/core';

const AddressForm = ({ closeAddress }) => {
  const [address, setAddress] = useState({
    name: '',
    street: '',
    postcode: '',
    city: '',
    country: '',
    phone: ''
  });

  const { name, street, postcode, city, country, phone } = address;

  const onChange = e => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    closeAddress();
    console.log(address);
  };

  return (
    <Box className='form-box' margin='auto' marginTop='10%'>
      <Card raised>
        <CardContent>
          <Typography variant='h4' align='center'>
            Enter Address
          </Typography>
          <br />
          <form onSubmit={onSubmit} style={{ textAlign: 'center' }}>
            <TextField
              label='Name'
              type='text'
              name='name'
              value={name}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <TextField
              label='Street'
              type='text'
              name='street'
              value={street}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <TextField
              label='Postcode'
              type='text'
              name='postcode'
              value={postcode}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <TextField
              label='City'
              type='text'
              name='city'
              value={city}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <TextField
              label='Country'
              type='text'
              name='country'
              value={country}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <TextField
              label='Phone'
              type='text'
              name='phone'
              value={phone}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddressForm;
