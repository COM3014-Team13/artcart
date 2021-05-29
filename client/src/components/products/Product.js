import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../../context/product/productContext';
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
  const { product, getProduct } = productContext;
  const { title, price, image_url, desc, seller } = product;

  useEffect(() => {
    getProduct(props.match.params.id);
  }, []);

  const date = desc.date.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <Box paddingTop='2%'>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <Box paddingY='10px' display='flex' justifyContent='center'>
              <img
                src={image_url}
                alt={title}
                height='500px'
                style={{ border: '1px solid black', borderRadius: '8px' }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent align='center'>
              <Typography variant='h4'>{title}</Typography>
              <Typography>
                <PersonIcon
                  fontSize='small'
                  style={{ verticalAlign: '-3.5px' }}
                />
                <Link to={`/account/${seller.sid}`}>{seller.name}</Link>
                <br />
                <Rating
                  name='read-only'
                  value={seller.rating}
                  precision={0.5}
                  readOnly
                />
              </Typography>
              <Typography variant='subtitle1'>£{price}</Typography>
              <br />
              <Typography variant='subtitle2'>
                {desc.info}
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
                    <li>Artist: {desc.artist}</li>
                    <li>Date: {date}</li>
                    <li>Type: {desc.type}</li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Product;
