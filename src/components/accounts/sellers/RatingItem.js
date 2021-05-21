import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, ListItem, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const RatingItem = ({ rating }) => {
  const { review, value } = rating;
  return (
    // <ListItem>
    <div>
      <Card>
        <CardContent>
          <Typography>
            <AccountCircleIcon
              fontSize='small'
              style={{ verticalAlign: '-3.5px' }}
            />{' '}
            ArtCart User
          </Typography>
          <Rating name='read-only' value={value} precision={0.5} readOnly />
          <Typography variant='h5'>{review}</Typography>
        </CardContent>
      </Card>
      <br />
    </div>
    // </ListItem>
  );
};

RatingItem.propTypes = {
  rating: PropTypes.object.isRequired
};

export default RatingItem;
