import mongoose from 'mongoose';

interface IProduct {
  name: string;
  price: number;
  description: string;
  category: string;
  subCategory?: string;
  coverImage: string;
  images: string[];
  dateUpdated: Date;
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required.']
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Product category is required.']
  },
  subCategory: {
    type: String
  },
  coverImage: {
    type: String,
    required: [true, 'Product cover image is required.']
  },
  images: {
    type: [String]
  },
  dateUpdated: {
    type: Date,
    default: Date.now(),
    required: [true, 'Product date updated is required.']
  }
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
