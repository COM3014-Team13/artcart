import mongoose from 'mongoose';

interface CustomerAttrs {
  user: object;
  addresses: Array<object>;
}

interface CustomerModel extends mongoose.Model<CustomerDoc> {
  build(attrs: CustomerAttrs): CustomerDoc;
}

interface CustomerDoc extends mongoose.Document {
  user: object;
  addresses: Array<object>;
}

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

customerSchema.statics.build = (attrs: CustomerAttrs) => {
  return new Customer(attrs);
};

const Customer = mongoose.model<CustomerDoc, CustomerModel>(
  'Customer',
  customerSchema
);

export { Customer };
