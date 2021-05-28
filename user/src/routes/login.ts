import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Password } from '../services/password';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import {BadRequestError } from '@com3014/common';
import { validateRequest } from '@com3014/common';
import { Customer } from '../models/customer';
import { Seller } from '../models/seller';

const router = express.Router();

router.post(
  '/api/auth',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid input');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid input');
    }

    var obj;
    if (existingUser.role.toString() === 'customer') {
      obj = await Customer.findOne({ 'user.uid': existingUser._id });
    } else {
      obj = await Seller.findOne({ 'user.uid': existingUser._id });
    }

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name
      },
      process.env.JWT_KEY!
    );

    //Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(200).send({ token: userJwt, user: obj });
  }
);

export { router as loginRouter };
