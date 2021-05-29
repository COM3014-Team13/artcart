import React, { useReducer } from 'react';
import axios from 'axios';
import ProductContext from './productContext';
import productReducer from './productReducer';
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  SET_FORM_PRODUCT,
  RESET_FORM_SUCCESS,
  UPDATE_PRODUCT
} from '../types';

const ProductState = props => {
  const initialState = {
    products: [
      {
        id: 1,
        seller: {
          id: 'abc123',
          name: 'John Lennon',
          rating: 4.8
        },
        title: 'Mona Lisa',
        price: 11.99,
        image_url: 'https://i.imgur.com/UbNWn71.jpg',
        desc: {
          date: new Date(1503, 0, 0),
          artist: 'Leonardo da Vinci',
          type: 'Oil Painting',
          info: 'A classic piece by a legendary artist.'
        },
        seller_rating: 4.5
      },
      {
        id: 2,
        sid: 'def456',
        title: 'The Starry Night',
        price: 18.9,
        image_url: 'https://i.imgur.com/dQghycI.jpg',
        desc: {
          date: new Date(1889, 5, 1),
          artist: 'Vincent van Gogh',
          type: 'Oil Painting',
          info: 'A masterpiece by the Post-Impressionist genius.'
        },
        seller_rating: 4.8
      }
    ],
    product: {
      id: 2,
      seller: {
        id: 'def456',
        name: 'Jim Smith',
        rating: 3.5
      },
      title: 'The Starry Night',
      price: 18.99,
      image_url: 'https://i.imgur.com/dQghycI.jpg',
      desc: {
        date: new Date(1889, 5, 1),
        artist: 'Vincent van Gogh',
        type: 'Oil Painting',
        info: 'A masterpiece by the Post-Impressionist genius.'
      }
    },
    formProduct: {
      id: 2,
      seller: {
        id: 'def456',
        name: 'Jim Smith',
        rating: 3.5
      },
      title: 'The Starry Night',
      price: 18.99,
      image_url: 'https://i.imgur.com/dQghycI.jpg',
      desc: {
        date: new Date(1889, 5, 1),
        artist: 'Vincent van Gogh',
        type: 'Oil Painting',
        info: 'A masterpiece by the Post-Impressionist genius.'
      }
    },
    formSuccess: false
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

  const getPublicSellerProducts = id => {
    console.log('getPublicSellerProducts');
  };

  const setFormProduct = id => {
    dispatch({ type: SET_FORM_PRODUCT, payload: id });
  };
  const clearFormProduct = () => {
    console.log('clearFormProduct');
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        product: state.product,
        formProduct: state.formProduct,
        formSuccess: state.formSuccess,
        getProducts,
        getProduct,
        getPublicSellerProducts,
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
