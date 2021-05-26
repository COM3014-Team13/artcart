import React, { useReducer } from 'react';
import OrderContext from './orderContext';
import orderReducer from './orderReducer';

const OrderState = props => {
  const initialState = {
    orders: [
      {
        id: 1,
        cid: 1,
        sid: 1,
        product: {
          pid: 1,
          name: 'The Night Watch',
          price: 29.99,
          image_url: 'https://i.imgur.com/kIfr2Yl.jpg'
        },
        shipping: {
          address: {
            name: 'John Smith',
            street: '10 Downing Street',
            postcode: 'SW1A 2AA',
            city: 'London',
            country: 'UK',
            phone: '+441234567890'
          }
        },
        rated: false,
        date: new Date(2021, 2, 24)
      },
      {
        id: 2,
        cid: 1,
        sid: 1,
        product: {
          pid: 2,
          name: 'Girl with a Pearl Earring',
          price: 11.99,
          image_url: 'https://i.imgur.com/2HKHHm5.jpg'
        },
        shipping: {
          address: {
            name: 'John Smith',
            street: '10 Downing Street',
            postcode: 'SW1A 2AA',
            city: 'London',
            country: 'UK',
            phone: '+441234567890'
          }
        },
        rated: false,
        date: new Date(2021, 2, 24)
      }
    ],
    order: {
      id: 1,
      cid: 1,
      sid: 1,
      product: {
        pid: 1,
        name: 'The Night Watch',
        price: 29.99,
        image_url: 'https://i.imgur.com/kIfr2Yl.jpg'
      },
      shipping: {
        address: {
          name: 'John Smith',
          street: '10 Downing Street',
          postcode: 'SW1A 2AA',
          city: 'London',
          country: 'UK',
          phone: '+441234567890'
        }
      },
      rated: false,
      date: new Date(2021, 2, 24)
    }
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        order: state.order
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
