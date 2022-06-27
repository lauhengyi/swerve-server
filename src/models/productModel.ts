import mongoose from 'mongoose';
import IProduct from '../interfaces/IProduct';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required']
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: Number,
    required: [true, 'Product category is required']
  },
  subCategory: {
    type: Number
  },
  coverImage: {
    type: String,
    required: [true, 'Product cover image is required']
  },
  images: {
    type: [String]
  },
  numLikes: {
    type: Number,
    default: 0
  },
  dateUpdated: {
    type: Date,
    default: Date.now(),
    required: [true, 'Product date updated is required']
  }
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
