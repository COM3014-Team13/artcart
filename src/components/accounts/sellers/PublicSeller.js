import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/authContext';
import ProductContext from '../../../context/product/productContext';
import { Grid, List, Typography } from '@material-ui/core';

import RatingItem from './RatingItem';
import ProductCard from '../../products/ProductCard';

const PublicSeller = props => {
  const authContext = useContext(AuthContext);
  const { publicSeller, getPublicSeller } = authContext;
  const { name, email, ratings } = publicSeller;

  const productContext = useContext(ProductContext);
  const { products, getPublicSellerProducts } = productContext;

  useEffect(() => {
    getPublicSeller(props.match.params.id);
    getPublicSellerProducts(props.match.params.id);
  }, []);

  return (
    <div>
      <br />
      <Typography variant='h2'>{name} Page</Typography>
      <Typography variant='h5'>&emsp;{email}</Typography>
      <br />

      <Grid container spacing={3}>
        <Grid item xs={2} style={{ textAlign: 'right' }}>
          <Typography variant='h4'>Products</Typography>
        </Grid>
        <Grid item xs={10}>
          <List>
            <Grid container spacing={3}>
              {products.map(product => (
                <Grid item xs={5} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </List>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={2} style={{ textAlign: 'right' }}>
          <Typography variant='h4'>Seller Ratings</Typography>
        </Grid>
        <Grid item xs={10}>
          <List>
            {ratings.rating_list.map(rating => (
              <RatingItem rating={rating} />
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default PublicSeller;
