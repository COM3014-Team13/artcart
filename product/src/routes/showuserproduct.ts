import express, { Request, Response } from 'express';
import { NotFoundError } from '@com3014/common';
import { Product } from '../models/product';

const router = express.Router();

router.get('/api/products/account/:id', async (req: Request, res: Response) => {
  const products = await Product.find({ 'seller.sid': req.params.id });

  res.send(products);
});

export { router as showUserProductsRouter };
