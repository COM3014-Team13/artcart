import React, { useContext } from 'react';
import OrderContext from '../../../context/order/orderContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';

import AddressCard from '../customers/AddressCard';

import StarIcon from '@material-ui/icons/Star';

const Order = () => {
  const orderContext = useContext(OrderContext);
  const { order } = orderContext;
  const { id, product, shipping, rated, date } = order;
  return (
    <div>
      <Typography variant='h2'>Order #{id}</Typography>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant='h6'>Delivery To</Typography>
              <AddressCard address={shipping.address} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant='h6'>Product Purchased</Typography>
              <Card>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item md={6} center>
                      <Box display='flex' justifyContent='center'>
                        <img src={product.image_url} width='100px' alt='' />
                      </Box>
                    </Grid>
                    <Grid item xs='6'>
                      <Typography>{product.name}</Typography>
                      <Typography>£{product.price}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <br />
              <Button
                variant='contained'
                color='primary'
                size='large'
                startIcon={<StarIcon />}
              >
                Leave A Review
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Order;
