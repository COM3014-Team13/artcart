import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@material-ui/core';

import AuthContext from '../../context/auth/authContext';

const Register = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, register } = authContext;
  const [user, setUser] = useState({
    name: '',
    email: '',
    type: 'customer',
    password: '',
    confirmPassword: ''
  });

  const { name, email, type, password, confirmPassword } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
    } else {
      register({ name, email, role: type, password });
    }
  };

  return (
    <Box className='form-box' margin='auto' marginTop='10%'>
      <Card raised>
        <CardContent>
          <Typography variant='h4' align='center'>
            Register
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
              label='Email'
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
            <br />
            <br />

            <RadioGroup
              aria-label='role'
              name='type'
              value={type}
              onChange={onChange}
              style={{ display: 'flex', alignContent: 'center' }}
            >
              <FormControlLabel
                value='customer'
                control={<Radio color='primary' />}
                label='Customer'
              />
              <FormControlLabel
                value='seller'
                control={<Radio color='primary' />}
                label='Seller'
              />
            </RadioGroup>
            <TextField
              error={password.length > 0 && password.length < 8}
              label='Password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              helperText='At least 8 characters.'
              required
            />
            <br />
            <br />
            <TextField
              error={confirmPassword.length > 0 && password !== confirmPassword}
              label='Confirm Password'
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={onChange}
              required
              minLength='8'
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

export default Register;
