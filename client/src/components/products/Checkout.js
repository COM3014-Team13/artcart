import React, { useContext, useEffect } from 'react';
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
import PaymentIcon from '@material-ui/icons/Payment';

const Checkout = props => {
  const productContext = useContext(ProductContext);
  const { product, getProduct } = productContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/register');
    }
  }, [isAuthenticated, props.history]);

  useEffect(() => {
    getProduct(props.match.params.id);
  }, []);

  const { title, price, image_url, desc } = product;
  const date = desc.date.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div>
      <Box className='form-box' margin='auto' marginTop='10%'>
        <Card raised>
          <CardContent>
            <Typography variant='h2'>Checkout</Typography>
            <br />
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <img src={image_url} alt='' width='100%' />
              </Grid>
              <Grid item xs={8}>
                <Typography variant='h6'>{title}</Typography>
                <Typography>{desc.type + ' - ' + desc.artist}</Typography>
                <Typography>{desc.info}</Typography>
                <Typography>{date}</Typography>
              </Grid>
            </Grid>
            <Button
              variant='contained'
              color='primary'
              size='large'
              startIcon={<PaymentIcon />}
            >
              Buy Now (£{price})
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Checkout;
