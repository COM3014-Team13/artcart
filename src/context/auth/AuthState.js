import React, { useReducer } from 'react';
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
    }
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        customer: state.customer,
        orders: state.orders,
        seller: state.seller
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
