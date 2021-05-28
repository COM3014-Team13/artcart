import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, currentUser } from '@com3014/common';
import { Customer } from '../models/customer';

const router = express.Router();

router.post(
  '/api/user/address',
  currentUser,
  [
    (body('name').not().isEmpty(),
    body('street').not().isEmpty(),
    body('postcode').not().isEmpty(),
    body('city').not().isEmpty(),
    body('country').not().isEmpty(),
    body('phone').not().isEmpty())
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, street, postcode, city, country, phone } = req.body;

    var customer = await Customer.findOne({
      'user.uid': req.currentUser!.user.uid
    });

    if (!customer) {
      return res.status(401);
    }
    var address = { name, street, postcode, city, country, phone };
    customer.addresses.push(address);

    customer.save();
    res.status(200).send({ address });
  }
);

export { router as addAddressRouter };
