import {
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDER,
  RESET_ORDER_SUCCESS
} from '../types';

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
    case ADD_ORDER:
      return {
        ...state,
        order: [...state.orders, action.payload],
        orderSuccess: true
      };
    case RESET_ORDER_SUCCESS:
      return {
        ...state,
        orderSuccess: false
      };
    default:
      return state;
  }
};

export default orderReducer;
