import React, { useContext, useEffect, useState } from 'react';
import ProductContext from '../../../context/product/productContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Button,
  Grid,
  List,
  Modal,
  Tab,
  Typography
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import PasswordForm from '../shared/PasswordForm';
import ProductForm from './ProductForm';
import EditProductForm from './EditProductForm';
import Orders from '../../orders/Orders';
import ProductCard from '../../products/ProductCard';
import RatingItem from './RatingItem';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Seller = props => {
  const { currentUser, orders } = props;
  const { user, ratings } = currentUser;
  const productContext = useContext(ProductContext);
  const { products, getSellerProducts, setFormProduct, clearFormProduct } =
    productContext;

  useEffect(() => {
    getSellerProducts(currentUser._id);
  }, []);

  const [value, setValue] = useState('1');
  const [modal, setModal] = useState({
    password: false,
    product: false,
    edit: false
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Modal
        open={modal.product}
        onClose={() => {
          setModal({ ...modal, product: false });
        }}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <ProductForm
          closeProduct={() => {
            setModal({ ...modal, product: false });
          }}
        />
      </Modal>
      <Modal
        open={modal.password}
        onClose={() => {
          setModal({ ...modal, password: false });
        }}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <PasswordForm
          closePassword={() => {
            setModal({ ...modal, password: false });
          }}
        />
      </Modal>
      <Modal
        open={modal.edit}
        onClose={() => {
          setModal({ ...modal, edit: false });
          clearFormProduct();
        }}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <EditProductForm
          closeEditProduct={() => {
            setModal({ ...modal, edit: false });
            clearFormProduct();
          }}
        />
      </Modal>
      <Typography variant='h2'>Your Account</Typography>
      <TabContext value={value}>
        <AppBar position='static'>
          <TabList onChange={handleChange} aria-label='simple tabs example'>
            <Tab label='Info' value='1' />
            <Tab label='Products' value='2' />
            <Tab label='Orders' value='3' />
          </TabList>
        </AppBar>
        <TabPanel value='1'>
          <Grid container spacing={3}>
            <Grid item xs={2} alignItems='right'>
              <AccountCircleIcon style={{ height: '5em', width: '100%' }} />
            </Grid>
            <Grid item xs={10}>
              <Typography variant='h4'>{user.name}</Typography>
              <Typography variant='h5' style={{ paddingLeft: '1em' }}>
                {user.email}
              </Typography>
              <br />
              <Button
                variant='contained'
                onClick={() => {
                  setModal({ ...modal, product: true });
                }}
              >
                Add New Product
              </Button>
              <br />
              <br />
              <Button
                variant='contained'
                onClick={() => {
                  setModal({ ...modal, password: true });
                }}
              >
                Change Password
              </Button>

              <br />
              <br />
              <Typography variant='h4'> Ratings</Typography>
              <List>
                {ratings.rating_list.map(rating => (
                  <RatingItem rating={rating} />
                ))}
              </List>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value='2'>
          <Button
            variant='contained'
            onClick={() => {
              setModal({ ...modal, product: true });
            }}
          >
            Add New Product
          </Button>
          <br />
          <br />
          <Grid container spacing={3}>
            {products.map(product => (
              <Grid item xs={12} md={6} lg={4} key={product.id}>
                <Link>
                  <Button
                    variant='contained'
                    onClick={() => {
                      setFormProduct(product.id);
                      setModal({ ...modal, edit: true });
                    }}
                  >
                    Edit Product
                  </Button>
                </Link>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value='3'>
          <Orders orders={orders} />
        </TabPanel>
      </TabContext>
    </div>
  );
};

Seller.propTypes = {
  seller: PropTypes.object.isRequired
};

export default Seller;
