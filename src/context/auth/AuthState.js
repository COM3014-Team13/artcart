import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = props => {
  const initialState = {
    isAuthenticated: true,
    user: {
      id: 1,
      name: 'John Smith',
      email: 'john@smith.com',
      role: 'customer'
    },
    customer: {
      id: 1,
      uid: 1,
      addresses: [
        {
          name: 'John Smith',
          street: '10 Downing Street',
          postcode: 'SW1A 2AA',
          city: 'London',
          country: 'UK',
          phone: '+441234567890'
        },
        {
          name: 'John Smith',
          street: '10 Downing Street',
          postcode: 'SW1A 2AA',
          city: 'London',
          country: 'UK',
          phone: '+441234567890'
        }
      ]
    },
    seller: {
      id: 1,
      uid: 1,
      products: ['1', '2'],
      ratings: {
        num_ratings: 2,
        rating_list: [
          {
            rating: 4,
            review: 'Good service fast delivery.'
          },
          {
            rating: 3,
            review: 'Beautiful art piece, shipping was slow.'
          }
        ]
      }
    },
    publicSeller: {
      id: 1,
      uid: 1,
      name: 'John Smith',
      email: 'john@smith.com',
      products: ['1', '2'],
      ratings: {
        num_ratings: 2,
        rating_list: [
          {
            value: 4,
            review: 'Good service fast delivery.'
          },
          {
            value: 3,
            review: 'Beautiful art piece, shipping was slow.'
          }
        ]
      }
    }
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/user', formData, config);
      console.log('good');
    } catch (err) {
      console.log('bad');
    }
  };

  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', formData, config);
      console.log(res.data);
    } catch (err) {
      console.log('bad');
    }
  };

  const getPublicSeller = () => {
    console.log('getPublicSeller');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        customer: state.customer,
        orders: state.orders,
        seller: state.seller,
        publicSeller: state.publicSeller,
        register,
        login,
        getPublicSeller
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
