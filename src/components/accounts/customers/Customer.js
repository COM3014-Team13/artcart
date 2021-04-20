import React from 'react';
import PropTypes from 'prop-types';

const Customer = ({ customer }) => {
  const { addresses } = customer;
  return <div>{addresses[0].street}</div>;
};

Customer.propTypes = {
  customer: PropTypes.object.isRequired
};

export default Customer;
