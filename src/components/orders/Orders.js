import React from 'react';
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

const Orders = ({ orders }) => {
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
            <TableRow key={order.id}>
              <Link to={`/orders/${order.id}`}>
                <TableCell
                  component='th'
                  scope='row'
                  style={{ color: 'blue', textDecoration: 'underline' }}
                >
                  {order.id}
                </TableCell>
              </Link>
              <TableCell>{order.date.toLocaleString()}</TableCell>
              <TableCell>£{order.product.price}</TableCell>
              <TableCell>
                <Link to={`/orders/${order.id}`}>View Order</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Orders;
