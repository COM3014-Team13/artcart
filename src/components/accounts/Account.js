import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

import Customer from './customers/Customer';
import Seller from './sellers/Seller';

const Account = () => {
  const authContext = useContext(AuthContext);
  const { user, customer, orders, seller } = authContext;

  return (
    <div>
      {user.role === 'customer' ? (
        <Customer customer={customer} orders={orders} />
      ) : user.role === 'seller' ? (
        <Seller seller={seller} orders={orders} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Account;
