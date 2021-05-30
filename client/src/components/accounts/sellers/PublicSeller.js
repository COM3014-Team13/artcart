import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/authContext';
import ProductContext from '../../../context/product/productContext';
import { Grid, List, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

import RatingItem from './RatingItem';
import ProductCard from '../../products/ProductCard';

const PublicSeller = props => {
  const authContext = useContext(AuthContext);
  const { publicSeller, authLoading, getPublicSeller } = authContext;

  const productContext = useContext(ProductContext);
  const { products, getSellerProducts } = productContext;

  useEffect(() => {
    getPublicSeller(props.match.params.id);
    getSellerProducts(props.match.params.id);
  }, []);

  return (
    <Fragment>
      {publicSeller !== null && !authLoading ? (
        <Fragment>
          <br />
          <Typography variant='h2'>{publicSeller.user.name}'s Store</Typography>
          <Typography variant='h5'>
            &emsp;
            {publicSeller.ratings.average_rating === 0 ? (
              'No Ratings Yet'
            ) : (
              <Rating
                name='read-only'
                value={publicSeller.ratings.average_rating}
                precision={0.5}
                readOnly
              />
            )}
            <br />
            &emsp;{publicSeller.user.email}
          </Typography>
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
                {publicSeller.ratings.rating_list.map(rating => (
                  <RatingItem rating={rating} />
                ))}
              </List>
            </Grid>
          </Grid>
        </Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
};

export default PublicSeller;
