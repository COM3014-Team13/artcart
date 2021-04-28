import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError} from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/auth',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({email});
    if(!existingUser){
        throw new BadRequestError('Invalid input');
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);

    if(!passwordsMatch){
        throw new BadRequestError('Invalid input');
    }

        //Generate JWT
    const userJwt = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          role: existingUser.role
        },
        process.env.JWT_KEY!
      );

    //Store it on session object
    req.session = { 
        jwt: userJwt
    };

    res.status(200).send(existingUser);
  }
);

export { router as loginRouter };