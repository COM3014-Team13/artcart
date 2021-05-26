import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import Products from '../products/Products';

const Home = () => {
  return (
    <Fragment>
      <Typography variant='h2'>Latest</Typography>
      <Products />
    </Fragment>
  );
};

export default Home;
