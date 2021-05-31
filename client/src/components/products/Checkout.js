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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Checkout = props => {
  const productContext = useContext(ProductContext);
  const { product, productLoading, getProduct } = productContext;

  const authContext = useContext(AuthContext);
  const { authLoading, currentUser } = authContext;

  const orderContext = useContext(OrderContext);
  const { orderSuccess, addOrder, resetOrderSuccess } = orderContext;

  const [address, setAddress] = useState('');

  const onChange = e => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    if (orderSuccess) {
      resetOrderSuccess();
      props.history.push('/');
    }
    //eslint-disable-next-line
  }, [orderSuccess, props.history]);

  useEffect(() => {
    getProduct(props.match.params.id);
    //eslint-disable-next-line
  }, []);

  const onClick = e => {
    addOrder({
      pid: props.match.params.id,
      address: address
    });
  };

  if (currentUser === null && !authLoading) {
    props.history.push('/register');
    return null;
  }

  return (
    <Fragment>
      {product !== null &&
      !productLoading &&
      currentUser !== null &&
      !authLoading ? (
        currentUser.user.role === 'seller' ? (
          props.history.push(`/product/${props.match.params.id}`)
        ) : (
          <Box className='form-box' margin='auto' marginTop='10%'>
            <Card raised>
              <CardContent>
                <Typography variant='h2'>Checkout</Typography>
                <br />
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <img src={product.image_url} alt='' width='100%' />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant='h6'>{product.title}</Typography>
                    <Typography>
                      {product.desc.type + ' - ' + product.desc.artist}
                    </Typography>
                    <Typography>{product.desc.info}</Typography>
                    <Typography>
                      {product.desc.date.toLocaleString('default', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </Typography>
                  </Grid>
                </Grid>
                <br />
                <Typography variant='h6'>Deliver To</Typography>
                {currentUser.addresses.length > 0 ? (
                  <Fragment>
                    <FormControl style={{ width: '100%' }}>
                      <InputLabel id='demo-simple-select-label'>
                        Address
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={address}
                        onChange={onChange}
                      >
                        {currentUser.addresses.map(address => (
                          <MenuItem key={address.street} value={address}>
                            {address.name}, {address.street}, {address.city},{' '}
                            {address.postcode}
                          </MenuItem>
                        ))}
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
                      Buy Now (£{product.price})
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Typography>
                      You must add an address to your account before you can buy
                      a product.
                    </Typography>
                    <br />
                    <Link to='/account'>
                      <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        startIcon={<AccountCircleIcon />}
                      >
                        Account
                      </Button>
                    </Link>
                  </Fragment>
                )}
              </CardContent>
            </Card>
          </Box>
        )
      ) : currentUser === null && !authLoading ? (
        props.history.push('/')
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
};

export default Checkout;
