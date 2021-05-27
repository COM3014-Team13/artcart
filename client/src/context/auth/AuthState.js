import React, { useReducer } from 'react';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_ADDRESS
} from '../types';
import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = props => {
  const initialState = {
    isAuthenticated: false,
    currentUser: null,
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
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
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
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  const addAddress = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/user/address', formData, config);
      dispatch({ type: ADD_ADDRESS, payload: res.data });
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  const logout = () => dispatch({ type: LOGOUT });

  const getPublicSeller = () => {
    console.log('getPublicSeller');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        user: state.user,
        customer: state.customer,
        orders: state.orders,
        seller: state.seller,
        publicSeller: state.publicSeller,
        register,
        login,
        logout,
        addAddress,
        getPublicSeller
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
