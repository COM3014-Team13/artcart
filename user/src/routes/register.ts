import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { Customer } from '../models/customer';
import { Seller } from '../models/seller';

import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError, currentUser } from '@com3014/common';

const router = express.Router();

router.post(
  '/api/user',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, name, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // console.log('Email in use');
      // return res.send({});
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password, name, role });
    await user.save();

    var obj;
    if (role === 'customer') {
      obj = new Customer({
        user: {
          uid: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        addresses: []
      });
      await obj.save();
    } else if (role === 'seller') {
      obj = new Seller({
        user: {
          uid: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        ratings: {
          num_ratings: 0,
          average_rating: 0,
          ratings_list: []
        }
      });
      await obj.save();
    } else {
      return res.status(401).json({ msg: 'Invalid Role' });
    }

    //Generate JWT
    const userJwt = jwt.sign(obj.toJSON(), process.env.JWT_KEY!);

    //Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send({ token: userJwt, user: obj });
  }
);

export { router as registerRouter };
