import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderContext from '../../context/order/orderContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Typography
} from '@material-ui/core';

import AddressCard from '../accounts/customers/AddressCard';
import NewRating from './NewRating';

import StarIcon from '@material-ui/icons/Star';

const Order = () => {
  const orderContext = useContext(OrderContext);
  const { order } = orderContext;
  const { id, product, shipping, rated, date } = order;

  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <NewRating closeModal={closeModal} />
      </Modal>
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
                        <img src={product.image_url} width='125px' alt='' />
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
                onClick={() => {
                  setOpen(true);
                }}
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
