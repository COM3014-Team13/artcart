import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { loginRouter } from './routes/login';
import { logoutRouter } from './routes/logout';
import { registerRouter } from './routes/register';
import {errorHandler} from '@com3014/common';
import { NotFoundError} from '@com3014/common';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false
  })
);


app.use(currentUserRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(registerRouter);

app.all('*', async (req,res) => {
    throw new NotFoundError()
}
);

app.use(errorHandler);

// app.get('/api/user', (req, res) => {
//     res.send('Login/Register!');
//   });

const start = async() => {

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://user-mongo-srv:27017/user',{
       useNewUrlParser: true,
       useUnifiedTopology: true, 
       useCreateIndex: true 
    });
    console.log('Connected to MongoDB');
  } catch (err){
    console.log(err);
}
app.listen(3000, () => {
    console.log('Listening on port 3000!!!!');
});

};

start();

