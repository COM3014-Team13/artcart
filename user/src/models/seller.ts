import mongoose from 'mongoose';

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
    rating_list: [
      {
        rating: {
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

const Seller = mongoose.model('Seller', sellerSchema);

export { Seller };
