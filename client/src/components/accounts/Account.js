import React, { Fragment, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

import Customer from './customers/Customer';
import Seller from './sellers/Seller';

const Account = props => {
  const authContext = useContext(AuthContext);
  const { authLoading, currentUser } = authContext;

  return (
    <Fragment>
      {currentUser !== null && !authLoading ? (
        currentUser.user.role === 'customer' ? (
          <Customer currentUser={currentUser} />
        ) : (
          <Seller currentUser={currentUser} />
        )
      ) : currentUser === null && !authLoading ? (
        props.history.push('/')
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
};

export default Account;
