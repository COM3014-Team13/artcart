import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../../context/product/productContext';
import AuthContext from '../../context/auth/authContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const Product = props => {
  const productContext = useContext(ProductContext);
  const { product, productLoading, getProduct } = productContext;
  const authContext = useContext(AuthContext);
  const { publicSeller, getPublicSeller } = authContext;

  useEffect(() => {
    getProduct(props.match.params.id);
  }, []);

  useEffect(() => {
    if (product !== null) {
      getPublicSeller(product.seller.sid);
    }
  }, [product]);

  return (
    <Fragment>
      {product !== null && !productLoading ? (
        <Box paddingTop='2%'>
          {}
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Card>
                <Box paddingY='10px' display='flex' justifyContent='center'>
                  <img
                    src={product.image_url}
                    alt={product.title}
                    height='500px'
                    style={{ border: '1px solid black', borderRadius: '8px' }}
                  />
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card>
                <CardContent align='center'>
                  <Typography variant='h4'>{product.title}</Typography>
                  <Typography>
                    <PersonIcon
                      fontSize='small'
                      style={{ verticalAlign: '-3.5px' }}
                    />
                    <Link to={`/account/${product.seller.sid}`}>
                      {product.seller.name}
                    </Link>
                    <br />
                    {publicSeller !== null ? (
                      <Rating
                        name='read-only'
                        value={publicSeller.ratings.average_rating}
                        precision={0.5}
                        readOnly
                      />
                    ) : (
                      <div>Ratings Loading....</div>
                    )}
                  </Typography>
                  <Typography variant='subtitle1'>£{product.price}</Typography>
                  <br />
                  <Typography variant='subtitle2'>
                    {product.desc.info}
                    <br />
                    <br />
                    <Link to={`${props.match.params.id}/checkout`}>
                      <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        startIcon={<ShoppingCart />}
                      >
                        Buy Now
                      </Button>
                    </Link>
                  </Typography>
                </CardContent>
              </Card>
              <br />
              <Box>
                <Card>
                  <CardContent>
                    <Typography variant='h5'>Product Details</Typography>
                    <Typography variant='body1'>
                      <ul>
                        <li>Artist: {product.desc.artist}</li>
                        <li>
                          Date:
                          {product.desc.date.toLocaleString('default', {
                            month: 'long',
                            year: 'numeric'
                          })}
                        </li>
                        <li>Type: {product.desc.type}</li>
                      </ul>
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
};

export default Product;
