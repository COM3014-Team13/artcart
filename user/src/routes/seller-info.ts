import express from 'express';
import { Seller } from '../models/seller';

const router = express.Router();

router.get('/api/user/:id', async (req, res) => {
  var seller = await Seller.findById(req.params.id);
  res.send(seller);
});

export { router as sellerInfoRouter };
