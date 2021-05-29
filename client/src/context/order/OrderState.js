import React, { useReducer } from 'react';
import axios from 'axios';
import {
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDER,
  RESET_ORDER_SUCCESS
} from '../types';
import OrderContext from './orderContext';
import orderReducer from './orderReducer';

const OrderState = props => {
  const initialState = {
    orders: [
      {
        id: 1,
        cid: 1,
        sid: 1,
        product: {
          pid: 1,
          name: 'The Night Watch',
          price: 29.99,
          image_url: 'https://i.imgur.com/kIfr2Yl.jpg'
        },
        shipping: {
          address: {
            name: 'John Smith',
            street: '10 Downing Street',
            postcode: 'SW1A 2AA',
            city: 'London',
            country: 'UK',
            phone: '+441234567890'
          }
        },
        rated: false,
        date: new Date(2021, 2, 24)
      },
      {
        id: 2,
        cid: 1,
        sid: 1,
        product: {
          pid: 2,
          name: 'Girl with a Pearl Earring',
          price: 11.99,
          image_url: 'https://i.imgur.com/2HKHHm5.jpg'
        },
        shipping: {
          address: {
            name: 'John Smith',
            street: '10 Downing Street',
            postcode: 'SW1A 2AA',
            city: 'London',
            country: 'UK',
            phone: '+441234567890'
          }
        },
        rated: false,
        date: new Date(2021, 2, 24)
      }
    ],
    order: {
      id: 1,
      cid: 1,
      sid: 1,
      product: {
        pid: 1,
        name: 'The Night Watch',
        price: 29.99,
        image_url: 'https://i.imgur.com/kIfr2Yl.jpg'
      },
      shipping: {
        address: {
          name: 'John Smith',
          street: '10 Downing Street',
          postcode: 'SW1A 2AA',
          city: 'London',
          country: 'UK',
          phone: '+441234567890'
        }
      },
      rated: false,
      date: new Date(2021, 2, 24)
    },
    orderSuccess: false
  };

  // Get Orders
  const getOrders = async () => {
    // GET request to product microservice
    try {
      const res = await axios.get('/api/orders/');
      dispatch({ type: GET_ORDERS, payload: res.data });
    } catch (err) {
      console.log('order error');
      // dispatch({ type: PRODUCT_ERROR });
    }
  };

  // Get Order
  const getOrder = async id => {
    // GET request to product microservice
    try {
      const res = await axios.get(`/api/orders/${id}`);
      dispatch({ type: GET_ORDER, payload: res.data });
    } catch (err) {
      console.log('order error');
      // dispatch({ type: PRODUCT_ERROR });
    }
  };

  const addOrder = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/orders/new', formData, config);
      dispatch({ type: ADD_ORDER, payload: res.data });
    } catch (err) {
      console.log('order error');
      // dispatch({ type: PRODUCT_ERROR });
    }
  };

  const resetOrderSuccess = () => dispatch({ type: RESET_ORDER_SUCCESS });

  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        order: state.order,
        orderSuccess: state.orderSuccess,
        getOrders,
        getOrder,
        addOrder,
        resetOrderSuccess
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
