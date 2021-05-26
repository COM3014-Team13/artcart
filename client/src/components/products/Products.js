import React, { useContext } from 'react';
import ProductCard from '../products/ProductCard';
import ProductContext from '../../context/product/productContext';
import { Grid } from '@material-ui/core';

const Products = () => {
  const productContext = useContext(ProductContext);
  const { products } = productContext;
  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item xs={12} sm={6} lg={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
