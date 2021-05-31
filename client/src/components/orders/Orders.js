import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';

import OrderContext from '../../context/order/orderContext';

const Orders = () => {
  const orderContext = useContext(OrderContext);
  const { orders, orderLoading, getOrders } = orderContext;

  useEffect(() => {
    getOrders();
    //eslint-disable-next-line
  }, []);

  if (orders.length === 0 && !orderLoading) {
    return <Fragment>You have no orders yet!</Fragment>;
  }

  return (
    <Fragment>
      {orders.length > 0 && !orderLoading ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order #</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Price Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(order => (
                <TableRow key={order._id}>
                  <TableCell
                    component='th'
                    scope='row'
                    style={{ color: 'blue', textDecoration: 'underline' }}
                  >
                    <Link to={`/order/${order._id}`}>{order._id}</Link>
                  </TableCell>

                  <TableCell>{order.date.toLocaleString()}</TableCell>
                  <TableCell>£{order.product.price}</TableCell>
                  <TableCell>
                    <Link to={`/order/${order._id}`}>View Order</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
};

export default Orders;
