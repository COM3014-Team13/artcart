import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import OrderContext from '../../context/order/orderContext';

import Customer from './customers/Customer';
import Seller from './sellers/Seller';

const Account = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, currentUser } = authContext;

  if (!isAuthenticated) return <div>{props.history.push('/register')}bruh</div>;

  return (
    <div>
      {currentUser && currentUser.user.role === 'customer' ? (
        <Customer currentUser={currentUser} />
      ) : currentUser.user.role === 'seller' ? (
        <Seller currentUser={currentUser} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Account;
