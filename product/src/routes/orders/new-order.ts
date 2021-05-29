import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { currentUser, requireAuth, validateRequest } from '@com3014/common';
import { Product } from '../../models/product';
import { Order } from '../../models/order';

const router = express.Router();

router.post(
  '/api/orders/new',
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

    const { pid, address } = req.body;

    const product = await Product.findById(pid);

    const order = Order.build({
      cid: req.currentUser!._id,
      sid: product!.seller.sid,
      product: {
        pid: product!.id,
        title: product!.title,
        price: product!.price,
        image_url: product!.image_url
      },
      shipping: {
        address: address
      },
      rated: false,
      date: new Date()
    });
    await order.save();

    res.status(201).send(order);
  }
);

export { router as createOrderRouter };
