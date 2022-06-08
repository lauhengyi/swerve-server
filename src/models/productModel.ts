import mongoose from 'mongoose';
import IProduct from '../interfaces/Iproduct';

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
  }
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
