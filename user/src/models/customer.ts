import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
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
  addresses: [
    {
      name: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      },
      postcode: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      }
    }
  ]
});

const Customer = mongoose.model('Customer', customerSchema);

export { Customer };
