import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { createProductRouter } from './routes/newproduct';
import { showProductRouter } from './routes/showproduct';
import { showAllProductsRouter } from './routes/showallproducts';
import { editProductRouter } from './routes/editproduct';
import { showUserProductsRouter } from './routes/showuserproduct';
import { createOrderRouter } from './routes/orders/new-order';
import { showOrdersRouter } from './routes/orders/show-orders';
import { showOrderRouter } from './routes/orders/show-order';
import { rateOrderRouter } from './routes/orders/add-rating';

import { errorHandler, NotFoundError, currentUser } from '@com3014/common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false
  })
);

app.use(currentUser);
// Products
app.use(createProductRouter);
app.use(showProductRouter);
app.use(showAllProductsRouter);
app.use(editProductRouter);
app.use(showUserProductsRouter);

// Orders
app.use(createOrderRouter);
app.use(showOrdersRouter);
app.use(showOrderRouter);
app.use(rateOrderRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

// app.get('/api/user', (req, res) => {
//     res.send('Login/Register!');
//   });

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect(
      'mongodb://products-microservice-mongo-srv:27017/products',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!');
  });
};

start();
