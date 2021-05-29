import { GET_ORDERS, GET_ORDER } from '../types';

const orderReducer = (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case GET_ORDER:
      return {
        ...state,
        order: action.payload
      };
    default:
      return state;
  }
};

export default orderReducer;
