import React, { useReducer } from 'react';
import axios from 'axios';
import {
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDER,
  RATE_ORDER,
  RESET_ORDER_SUCCESS,
  RESET_RATING_SUCCESS
} from '../types';
import OrderContext from './orderContext';
import orderReducer from './orderReducer';

const OrderState = props => {
  const initialState = {
    orders: [],
    order: null,
    orderSuccess: false,
    ratingSuccess: false,
    orderLoading: true
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

  const addOrderRating = async (id, formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(`/api/orders/${id}/rate`, formData, config);
      dispatch({ type: RATE_ORDER, payload: res.data });
    } catch (err) {
      console.log('order error');
      // dispatch({ type: PRODUCT_ERROR });
    }
  };

  const addSellerRating = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/user/rating', formData, config);
      console.log(res.data);
    } catch (err) {
      console.log('order error');
      // dispatch({ type: PRODUCT_ERROR });
    }
  };

  const resetOrderSuccess = () => dispatch({ type: RESET_ORDER_SUCCESS });
  const resetRatingSuccess = () => dispatch({ type: RESET_RATING_SUCCESS });

  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        order: state.order,
        orderSuccess: state.orderSuccess,
        ratingSuccess: state.ratingSuccess,
        orderLoading: state.orderLoading,
        getOrders,
        getOrder,
        addOrder,
        addOrderRating,
        addSellerRating,
        resetOrderSuccess,
        resetRatingSuccess
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
