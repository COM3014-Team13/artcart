import mongoose from 'mongoose';

type Seller = { sid: string; name: string; average_rating: number };
type Desc = { date: string; artist: string; type: string; info: string };

interface ProductAttrs {
  title: string;
  price: number;
  image_url: string;
  seller: Seller;
  desc: Desc;
}

interface ProductDoc extends mongoose.Document {
  title: string;
  price: number;
  image_url: string;
  seller: Seller;
  desc: Desc;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
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
    },
    seller: {
      sid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers'
      },
      name: {
        type: String,
        required: true
      },
      average_rating: {
        type: Number,
        required: true
      }
    },
    desc: {
      date: {
        type: String,
        required: true
      },
      artist: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      info: {
        type: String,
        required: true
      }
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  'Product',
  productSchema
);

export { Product };
