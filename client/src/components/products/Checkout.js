import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../../context/product/productContext';
import AuthContext from '../../context/auth/authContext';
import OrderContext from '../../context/order/orderContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';

const Checkout = props => {
  const productContext = useContext(ProductContext);
  const { product, getProduct } = productContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated, currentUser } = authContext;

  const orderContext = useContext(OrderContext);
  const { orderSuccess, addOrder, resetOrderSuccess } = orderContext;

  const [address, setAddress] = useState({});

  const onChange = e => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/register');
    }
  }, [isAuthenticated, props.history]);

  useEffect(() => {
    if (orderSuccess) {
      resetOrderSuccess();
      props.history.push('/');
    }
  }, [orderSuccess, props.history]);

  useEffect(() => {
    if (currentUser && currentUser.user.role === 'seller') {
      props.history.push(`/product/${props.match.params.id}`);
    }
    if (currentUser.addresses && currentUser.addresses.length > 0) {
      setAddress(currentUser.addresses[0]);
    }
    getProduct(props.match.params.id);
  }, []);

  const { title, price, image_url, desc } = product;
  const date = desc.date.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  const onClick = e => {
    addOrder({
      pid: props.match.params.id,
      address: address
    });
  };

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
            <br />
            <Typography variant='h6'>Deliver To</Typography>
            <FormControl>
              <InputLabel id='demo-simple-select-label'>Address</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={address}
                onChange={onChange}
              >
                {currentUser.addresses && currentUser.addresses.length > 0 ? (
                  currentUser.addresses.map(address => (
                    <MenuItem value={address}>
                      {address.name}, {address.street}, {address.city},{' '}
                      {address.postcode}
                    </MenuItem>
                  ))
                ) : (
                  <Fragment>
                    <div>You must first add an address to your account.</div>
                    <Link to='/account'>Account</Link>
                  </Fragment>
                )}
              </Select>
            </FormControl>
            <br />
            <br />
            <Button
              variant='contained'
              color='primary'
              size='large'
              startIcon={<PaymentIcon />}
              onClick={onClick}
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
