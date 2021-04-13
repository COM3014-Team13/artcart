import React, { Fragment, useContext } from 'react';
import ProductCard from '../products/ProductCard';
import ProductContext from '../../context/product/productContext';
import { Grid } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';

const Products = () => {
  const big = useMediaQuery({
    query: '(min-width: 1200px)'
  });
  const med = useMediaQuery({
    query: '(min-width: 500px)'
  });

  const productContext = useContext(ProductContext);
  const { products } = productContext;
  return (
    <div style={{ width: '100%' }}>
      <Grid container spacing={3}>
        {products.map(x => (
          <Grid item xs={big ? 4 : med ? 6 : 12} key={x.id}>
            <ProductCard product={x} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
