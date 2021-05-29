import React, { useReducer } from 'react';
import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_ADDRESS,
  GET_PUBLIC_SELLER,
  USER_LOADED,
  AUTH_ERROR
} from '../types';
import AuthContext from './authContext';
import authReducer from './authReducer';

const AuthState = props => {
  const initialState = {
    isAuthenticated: false,
    authLoading: true,
    currentUser: null,
    publicSeller: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const loadUser = async () => {
    try {
      const res = await axios.get('/api/user');
      if (res.data === null) throw 'exception';
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

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

  const logout = async () => {
    try {
      await axios.post('/api/user/logout');
      dispatch({ type: LOGOUT });
    } catch (err) {
      console.log('Logout Failed');
    }
  };

  const getPublicSeller = async id => {
    try {
      const res = await axios.get(`/api/user/${id}`);
      dispatch({ type: GET_PUBLIC_SELLER, payload: res.data });
    } catch (err) {
      console.log('product error');
      // dispatch({ type: PRODUCT_ERROR });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        authLoading: state.authLoading,
        publicSeller: state.publicSeller,
        loadUser,
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
