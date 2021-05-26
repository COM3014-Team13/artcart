import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import OrderContext from '../../context/order/orderContext';

import Customer from './customers/Customer';
import Seller from './sellers/Seller';

const Account = () => {
  const authContext = useContext(AuthContext);
  const { user, customer, seller } = authContext;
  const orderContext = useContext(OrderContext);
  const { orders } = orderContext;

  return (
    <div>
      {user.role === 'customer' ? (
        <Customer user={user} customer={customer} orders={orders} />
      ) : user.role === 'seller' ? (
        <Seller user={user} seller={seller} orders={orders} />
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default Account;
