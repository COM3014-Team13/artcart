import mongoose from 'mongoose';

type Seller = {sid: string, name: string, rating: number};
type Desc = {date: string, artist: string, type: string, info: string};

interface ProductAttrs {
    title: string;
    price: number;
    image_url: string;
    seller: Seller;
    desc:Desc;

}


interface ProductDoc extends mongoose.Document {
    title: string;
    price: number;
    image_url: string;
    seller: Seller;
    desc: Desc;
}

interface ProductModel extends mongoose.Model<ProductDoc>{
    build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image_url:{
        type: String,
        required: true
    },
    seller:{
        type: {sid: String,name: String,rating: Number},
        required: true
    },
    desc:{
        type:{date: String,artist: String,type: String,info: String},
        required: true
    }
}, {
    toJSON:{
        transform(doc,ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

productSchema.statics.build = (attrs: ProductAttrs) => {
    return new Product(attrs);

};

const Product = mongoose.model<ProductDoc, ProductModel>('Product',productSchema);

export { Product};