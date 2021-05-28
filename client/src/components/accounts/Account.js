import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import OrderContext from '../../context/order/orderContext';

import Customer from './customers/Customer';
import Seller from './sellers/Seller';

const Account = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, currentUser, customer, seller } = authContext;
  const orderContext = useContext(OrderContext);
  const { orders } = orderContext;

  if (!isAuthenticated) return <div>{props.history.push('/register')}bruh</div>;

  return (
    <div>
      {currentUser && currentUser.user.role === 'customer' ? (
        <Customer currentUser={currentUser} orders={orders} />
      ) : currentUser.user.role === 'seller' ? (
        <Seller currentUser={currentUser} orders={orders} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Account;
