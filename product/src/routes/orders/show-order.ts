import express, { Request, Response } from 'express';
import { requireAuth } from '@com3014/common';
import { Order } from '../../models/order';

const router = express.Router();

router.get(
  '/api/orders/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);
    res.send(order);
  }
);

export { router as showOrderRouter };
