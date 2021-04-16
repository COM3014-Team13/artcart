import React, { useContext } from 'react';
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
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item xs={big ? 4 : med ? 6 : 12} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
