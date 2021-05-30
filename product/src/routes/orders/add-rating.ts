import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { currentUser, requireAuth, validateRequest } from '@com3014/common';
import { Product } from '../../models/product';
import { Order } from '../../models/order';

const router = express.Router();

router.post(
  '/api/orders/:id/rate',
  requireAuth,
  // [
  //   body('title').not().isEmpty().withMessage('Title is required'),
  //   body('image_url').not().isEmpty().withMessage('Image is required'),
  //   body('desc').not().isEmpty().withMessage('Description is required')
  // ],
  validateRequest,
  async (req: Request, res: Response) => {
    if (req.currentUser!.user.role !== 'customer') {
      return res.status(403);
    }

    const { value, review } = req.body;

    const order = await Order.findById(req.params.id);

    if (order === null) {
      return res.status(400);
    }

    order.rating.value = value;
    order.rating.review = review;
    order.rated = true;

    await order.save();

    res.status(201).send(order);
  }
);

export { router as rateOrderRouter };
