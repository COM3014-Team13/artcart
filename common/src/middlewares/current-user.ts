import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface NestedUser {
  uid: string;
  name: string;
  email: string;
  role: string;
}

interface NestedAddress {
  name: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
  phone: string;
}

interface NestedRating {
  rating: number;
  review: string;
}

interface NestedRatings {
  num_ratings: number;
  average_rating: number;
  rating_list: Array<NestedRating>;
}

interface UserPayload {
  user: NestedUser;
  addresses?: Array<NestedAddress>;
  ratings?: NestedRatings;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
