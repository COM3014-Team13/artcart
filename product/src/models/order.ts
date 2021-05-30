import mongoose from 'mongoose';

type Product = { pid: string; title: string; price: number; image_url: string };
type Address = {
  name: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
  phone: string;
};
type Shipping = { address: Address };
type Rating = { value: number; review?: string };

interface OrderAttrs {
  cid: string;
  sid: string;
  product: Product;
  shipping: Shipping;
  rating: Rating;
  rated: boolean;
  date: Date;
}

interface OrderDoc extends mongoose.Document {
  cid: string;
  sid: string;
  product: Product;
  shipping: Shipping;
  rating: Rating;
  rated: boolean;
  date: Date;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
  cid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customers'
  },
  sid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sellers'
  },
  product: {
    pid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products'
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    image_url: {
      type: String,
      required: true
    }
  },
  shipping: {
    address: {
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
  },
  rating: {
    value: {
      type: Number,
      default: 0
    },
    review: {
      type: String
    }
  },
  rated: {
    type: Boolean,
    default: false
  },
  date: { type: Date, default: Date.now() }
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
