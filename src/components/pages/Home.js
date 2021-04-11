import React, { Fragment, useContext } from 'react';
import { Typography } from '@material-ui/core';
import ProductContext from '../../context/product/productContext';

const Home = () => {
  const productContext = useContext(ProductContext);
  const { products } = productContext;

  return (
    <Fragment>
      <Typography>Home Page.</Typography>
      <Typography variant='h2'>{products[0].title}</Typography>
      <Typography variant='h2'>{products[1].title}</Typography>
    </Fragment>
  );
};

export default Home;
