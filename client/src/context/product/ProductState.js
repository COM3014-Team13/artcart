import React, { useReducer } from 'react';
import axios from 'axios';
import ProductContext from './productContext';
import productReducer from './productReducer';
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  SET_FORM_PRODUCT,
  CLEAR_FORM_PRODUCT,
  RESET_FORM_SUCCESS
} from '../types';

const ProductState = props => {
  const initialState = {
    products: [],
    product: null,
    formProduct: null,
    formSuccess: false,
    productLoading: true
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  // Get Products
  const getProducts = async () => {
    // GET request to product microservice
    try {
      const res = await axios.get('/api/products/');
      dispatch({ type: GET_PRODUCTS, payload: res.data });
    } catch (err) {
      console.log('product error');
      // dispatch({ type: PRODUCT_ERROR });
    }
  };

  // Get Product
  const getProduct = async id => {
    // GET request to product microservice
    try {
      const res = await axios.get(`/api/products/${id}`);
      dispatch({ type: GET_PRODUCT, payload: res.data });
    } catch (err) {
      console.log('product error');
      // dispatch({ type: PRODUCT_ERROR });
    }
  };

  const addProduct = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/products/new', formData, config);
      dispatch({ type: ADD_PRODUCT, payload: res.data });
    } catch (err) {
      console.log('product error');
      // dispatch({ type: PRODUCT_ERROR });
    }
  };

  const updateProduct = async (id, formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/products/${id}/edit`, formData, config);
      dispatch({ type: UPDATE_PRODUCT, payload: res.data });
    } catch (err) {
      console.log('product error');
      // dispatch({ type: PRODUCT_ERROR });
    }
  };

  const resetFormSuccess = () => dispatch({ type: RESET_FORM_SUCCESS });

  const getSellerProducts = async id => {
    try {
      const res = await axios.get(`/api/products/account/${id}`);
      dispatch({ type: GET_PRODUCTS, payload: res.data });
    } catch (err) {
      console.log('product error');
      // dispatch({ type: PRODUCT_ERROR });
    }
  };

  const setFormProduct = id => {
    dispatch({ type: SET_FORM_PRODUCT, payload: id });
  };
  const clearFormProduct = () => {
    dispatch({ type: CLEAR_FORM_PRODUCT });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        product: state.product,
        formProduct: state.formProduct,
        formSuccess: state.formSuccess,
        productLoading: state.productLoading,
        getProducts,
        getProduct,
        getSellerProducts,
        setFormProduct,
        clearFormProduct,
        addProduct,
        updateProduct,
        resetFormSuccess
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
