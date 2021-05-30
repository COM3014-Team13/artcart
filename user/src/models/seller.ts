import mongoose from 'mongoose';

type User = { uid: string; name: string; email: string; role: string };
type Rating = { value: number; review?: string };
type Ratings = {
  num_ratings: number;
  average_rating: number;
  rating_list: Array<Rating>;
};

interface SellerAttrs {
  user: User;
  ratings: Ratings;
}

interface SellerModel extends mongoose.Model<SellerDoc> {
  build(attrs: SellerAttrs): SellerDoc;
}

interface SellerDoc extends mongoose.Document {
  user: User;
  ratings: Ratings;
}

const sellerSchema = new mongoose.Schema({
  user: {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['customer', 'seller'],
      required: true
    }
  },
  ratings: {
    num_ratings: {
      type: Number,
      default: 0
    },
    average_rating: {
      type: Number,
      default: 0
    },
    rating_list: [
      {
        value: {
          type: Number,
          required: true
        },
        review: {
          type: String
        }
      }
    ]
  }
});

sellerSchema.statics.build = (attrs: SellerAttrs) => {
  return new Seller(attrs);
};

const Seller = mongoose.model<SellerDoc, SellerModel>('Seller', sellerSchema);

export { Seller };
