import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

import Customer from './customers/Customer';
import Seller from './sellers/Seller';

const Account = () => {
  const authContext = useContext(AuthContext);
  const { user, customer, seller } = authContext;

  return (
    <div>
      <div> Account Page for {user.name}</div>
      {user.role === 'customer' ? (
        <Customer customer={customer} />
      ) : user.role === 'seller' ? (
        <Seller seller={seller} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Account;
