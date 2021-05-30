import React, { useReducer } from 'react';
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
    orders: [],
    order: null,
    orderSuccess: false,
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

  const resetOrderSuccess = () => dispatch({ type: RESET_ORDER_SUCCESS });

  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        order: state.order,
        orderSuccess: state.orderSuccess,
        orderLoading: state.orderLoading,
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
