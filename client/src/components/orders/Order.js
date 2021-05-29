import React, { Fragment, useContext, useEffect, useState } from 'react';
import OrderContext from '../../context/order/orderContext';
import AuthContext from '../../context/auth/authContext';
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

const Order = props => {
  const authContext = useContext(AuthContext);
  const { authLoading, currentUser } = authContext;
  const orderContext = useContext(OrderContext);
  const { order, orderLoading, getOrder } = orderContext;
  // const { _id, product, shipping, rated, date } = order;

  useEffect(() => {
    getOrder(props.match.params.id);
  }, []);

  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      {currentUser !== null &&
      !authLoading &&
      order !== null &&
      !orderLoading ? (
        <Fragment>
          <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
          >
            <NewRating closeModal={closeModal} />
          </Modal>
          <Typography variant='h2'>Order #{order._id}</Typography>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6'>Delivery To</Typography>
                  <AddressCard address={order.shipping.address} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h6'>Product Purchased</Typography>
                  <Card>
                    <CardContent>
                      <Grid container spacing={1}>
                        <Grid item md={6} center>
                          <Box display='flex' justifyContent='center'>
                            <img
                              src={order.product.image_url}
                              width='125px'
                              alt=''
                            />
                          </Box>
                        </Grid>
                        <Grid item xs='6'>
                          <Typography>{order.product.title}</Typography>
                          <Typography>£{order.product.price}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <br />
                  {currentUser.user.role === 'customer' && !order.rated && (
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
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
};

export default Order;
