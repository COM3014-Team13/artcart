import React, { Fragment, useContext } from 'react';
import { Typography } from '@material-ui/core';
import Products from '../products/Products';

const Home = () => {
  return (
    <Fragment>
      <Typography>Home Page.</Typography>
      <Products />
      {/* <Typography variant='h2'>{products[0].title}</Typography>
      <Typography variant='h2'>{products[1].title}</Typography> */}
    </Fragment>
  );
};

export default Home;
