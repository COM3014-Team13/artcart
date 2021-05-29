import React, { useContext, useEffect } from 'react';
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
  const { orders, getOrders } = orderContext;

  useEffect(() => {
    getOrders();
  }, []);

  return (
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
              <Link to={`/order/${order._id}`}>
                <TableCell
                  component='th'
                  scope='row'
                  style={{ color: 'blue', textDecoration: 'underline' }}
                >
                  {order._id}
                </TableCell>
              </Link>
              <TableCell>{order.date.toLocaleString()}</TableCell>
              <TableCell>£{order.product.price}</TableCell>
              <TableCell>
                <Link to={`/order/${order.id}`}>View Order</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Orders;
