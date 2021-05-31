import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from '@material-ui/core';

const PasswordForm = ({ closePassword }) => {
  const [passwords, setPasswords] = useState({
    current: '',
    newPassword: '',
    newPasswordConfirm: ''
  });

  const { current, newPassword, newPasswordConfirm } = passwords;

  const onChange = e => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    closePassword();
  };

  return (
    <Box className='form-box' margin='auto' marginTop='10%'>
      <Card raised>
        <CardContent>
          <Typography variant='h4' align='center'>
            Change Password
          </Typography>
          <Typography variant='h2' align='center'>
            PASSWORD CHANGING NOT IMPLEMENTED
          </Typography>
          <br />
          <form onSubmit={onSubmit} style={{ textAlign: 'center' }}>
            <TextField
              label='Current Password'
              type='password'
              name='current'
              value={current}
              onChange={onChange}
              required
            />
            <br />
            <br />
            <TextField
              error={newPassword.length > 0 && newPassword.length < 8}
              label='New Password'
              type='password'
              name='newPassword'
              value={newPassword}
              onChange={onChange}
              helperText='At least 8 characters.'
              required
            />
            <br />
            <br />
            <TextField
              error={
                newPasswordConfirm.length > 0 &&
                newPassword !== newPasswordConfirm
              }
              label='Confirm New Password'
              type='password'
              name='newPasswordConfirm'
              value={newPasswordConfirm}
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

export default PasswordForm;
