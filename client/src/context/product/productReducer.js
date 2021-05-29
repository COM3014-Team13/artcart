import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  RESET_FORM_SUCCESS
} from '../types';

const productReducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
        formSuccess: true
      };
    case RESET_FORM_SUCCESS:
      return {
        ...state,
        formSuccess: false
      };
    default:
      return state;
  }
};

export default productReducer;
