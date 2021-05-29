import React, { Fragment, useContext, useEffect } from 'react';
import ProductCard from '../products/ProductCard';
import ProductContext from '../../context/product/productContext';
import { Grid } from '@material-ui/core';

const Products = () => {
  const productContext = useContext(ProductContext);
  const { products, productLoading, getProducts } = productContext;

  useEffect(() => {
    getProducts();
  }, []);

  if (products.length === 0 && !productLoading) {
    return <Fragment>There are no products on the platform yet!</Fragment>;
  }

  return (
    <Fragment>
      {products.length > 0 && !productLoading ? (
        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item xs={12} sm={6} lg={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
};

export default Products;
