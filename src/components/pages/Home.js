import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import Products from '../products/Products';

const Home = () => {
  return (
    <Fragment>
      <Typography>Home Page.</Typography>
      <Products />
    </Fragment>
  );
};

export default Home;
