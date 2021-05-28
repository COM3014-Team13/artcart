import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Typography
} from '@material-ui/core';

import AuthContext from '../../context/auth/authContext';

const Login = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, login } = authContext;
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

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
    login(user);
  };

  return (
    <Box className='form-box' margin='auto' marginTop='10%'>
      <Card raised>
        <CardContent>
          <Typography variant='h4' align='center'>
            Login
          </Typography>
          <br />
          <form onSubmit={onSubmit} style={{ textAlign: 'center' }}>
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
            <Button type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
