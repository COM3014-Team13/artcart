import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@com3014/common';
import { Product } from '../models/product';

const router = express.Router();

router.post(
  '/api/products/new',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('image_url').not().isEmpty().withMessage('Image is required'),
    body('desc').not().isEmpty().withMessage('Description is required')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, image_url, price, desc } = req.body;

    const product = Product.build({
      title,
      price,
      image_url,
      seller: {
        sid: req.currentUser!._id,
        name: req.currentUser!.user.name,
        average_rating: req.currentUser!.ratings!.average_rating
      },
      desc
    });
    await product.save();

    res.status(201).send(product);
  }
);

export { router as createProductRouter };
