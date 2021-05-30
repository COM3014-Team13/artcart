import {
  GET_ORDERS,
  GET_ORDER,
  ADD_ORDER,
  RATE_ORDER,
  RESET_ORDER_SUCCESS,
  RESET_RATING_SUCCESS
} from '../types';

const orderReducer = (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        orderLoading: false
      };
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
        orderLoading: false
      };
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        orderSuccess: true
      };
    case RATE_ORDER:
      return {
        ...state,
        order: action.payload,
        ratingSuccess: true
      };
    case RESET_ORDER_SUCCESS:
      return {
        ...state,
        orderSuccess: false
      };
    case RESET_RATING_SUCCESS:
      return {
        ...state,
        ratingSuccess: false
      };
    default:
      return state;
  }
};

export default orderReducer;
