import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  SET_FORM_PRODUCT,
  CLEAR_FORM_PRODUCT,
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
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        ),
        formSuccess: true
      };
    case SET_FORM_PRODUCT:
      return {
        ...state,
        formProduct: state.products.find(
          product => product.id === action.payload
        )
      };
    case CLEAR_FORM_PRODUCT:
      return {
        ...state,
        formProduct: {}
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
