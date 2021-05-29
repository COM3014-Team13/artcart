import express from 'express';
import { currentUser } from '@com3014/common';
import { User } from '../models/user';
import { Customer } from '../models/customer';
import { Seller } from '../models/seller';

const router = express.Router();

router.get('/api/user/:id', async (req, res) => {
  var seller = await Seller.findById(req.params.id);
  console.log(seller);
  res.send(seller);
});

export { router as sellerInfoRouter };
