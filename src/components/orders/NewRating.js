import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const NewRating = ({ closeModal }) => {
  const [rating, setRating] = useState({
    value: 0,
    review: ''
  });

  const { value, review } = rating;

  const onChange = e => {
    setRating({ ...rating, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (value > 0) {
      closeModal();
      console.log(rating);
    } else {
      console.log('Rate above 0!');
    }
  };

  return (
    <Box className='form-box' margin='auto' marginTop='10%'>
      <Card raised>
        <CardContent>
          <Typography variant='h4' align='center'>
            Review
          </Typography>
          <br />
          <Box mb={3} style={{ textAlign: 'center' }}>
            <Typography>Rating</Typography>
            <Rating name='value' value={value} onChange={onChange} />
          </Box>
          <form onSubmit={onSubmit} style={{ textAlign: 'center' }}>
            <TextField
              label='Review (Optional)'
              type='text'
              name='review'
              value={review}
              onChange={onChange}
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

export default NewRating;
