import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Typography
} from '@material-ui/core';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { name, email, password, confirmPassword } = user;

  const big = useMediaQuery({
    query: '(min-width: 1200px)'
  });
  const med = useMediaQuery({
    query: '(min-width: 500px)'
  });

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
    } else {
      console.log(user);
    }
  };

  return (
    <Box
      width={big ? '30%' : med ? '60%' : '100%'}
      margin='auto'
      marginTop='10%'
    >
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
