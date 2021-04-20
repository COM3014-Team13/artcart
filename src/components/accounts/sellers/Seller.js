import React from 'react';
import PropTypes from 'prop-types';

const Seller = ({ seller }) => {
  const { ratings } = seller;
  return <div>{ratings.rating_list[0].review}</div>;
};

Seller.propTypes = {
  seller: PropTypes.object.isRequired
};

export default Seller;
