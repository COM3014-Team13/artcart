import React, { useReducer } from 'react';
import ProductContext from './productContext';
import productReducer from './productReducer';
import { GET_PRODUCTS } from '../types';

const ProductState = props => {
  const initialState = {
    products: [
      {
        id: 1,
        sid: 'abc123',
        title: 'Mona Lisa',
        price: {
          value: 11.99,
          discount: 0.25
        },
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
        price: {
          value: 18.99,
          discount: 0.35
        },
        image_url: 'https://i.imgur.com/dQghycI.jpg',
        desc: {
          date: new Date(1889, 5, 0),
          artist: 'Vincent van Gogh',
          type: 'Oil Painting',
          info: 'A masterpiece by the Post-Impressionist genius.'
        },
        seller_rating: 4.8
      }
    ]
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  // Get Products
  const getProducts = () => {
    // GET request to product microservice
    console.log('Get Products!');
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        getProducts
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
