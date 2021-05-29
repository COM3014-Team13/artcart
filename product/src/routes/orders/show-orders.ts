import express, { Request, Response } from 'express';
import { requireAuth } from '@com3014/common';
import { Order } from '../../models/order';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  var orders;
  if (req.currentUser!.user.role === 'customer') {
    orders = await Order.find({ cid: req.currentUser?._id });
  } else {
    orders = await Order.find({ sid: req.currentUser?._id });
  }

  res.send(orders);
});

export { router as showOrdersRouter };
