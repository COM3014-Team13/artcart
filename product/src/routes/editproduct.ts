import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError
} from '@com3014/common';
import { Product } from '../models/product';

const router = express.Router();

router.put(
  '/api/products/:id/edit',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('image_url').not().isEmpty().withMessage('Image is required')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new NotFoundError();
    }

    if (product.seller.sid != req.currentUser!._id) {
      throw new NotAuthorizedError();
    }

    product.set({
      title: req.body.title,
      price: req.body.price,
      image_url: req.body.image_url,
      desc: req.body.desc
    });

    await product.save();

    res.send(product);
  }
);

export { router as editProductRouter };
