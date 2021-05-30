import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, currentUser } from '@com3014/common';
import { Seller } from '../models/seller';

const router = express.Router();

router.post('/api/user/rating', async (req: Request, res: Response) => {
  const { pid, value, review } = req.body;

  var seller = await Seller.findById(pid);

  if (seller === null) {
    return res.status(401);
  }

  // calculate new average
  seller.ratings.average_rating =
    (seller.ratings.average_rating * seller.ratings.num_ratings + value) /
    (seller.ratings.num_ratings + 1);
  seller.ratings.num_ratings = seller.ratings.num_ratings + 1;

  // add new rating to list
  const rating = { value, review };
  seller.ratings.rating_list.push(rating);

  seller.save();
  res.status(200).send(true);
});

export { router as addRatingRouter };
