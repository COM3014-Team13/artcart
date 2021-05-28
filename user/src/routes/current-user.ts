import express from 'express';
import { currentUser } from '@com3014/common';
import { User } from '../models/user';
import { Customer } from '../models/customer';
import { Seller } from '../models/seller';

const router = express.Router();

router.get('/api/user', currentUser, async (req, res) => {
  var user = await User.findById(req.currentUser!.id);
  if (!user) return res.send(null);

  var obj;
  if (user.role.toString() === 'customer') {
    obj = await Customer.findOne({ 'user.uid': user._id });
  } else {
    obj = await Seller.findOne({ 'user.uid': user._id });
  }

  res.send(obj);
});

export { router as currentUserRouter };
