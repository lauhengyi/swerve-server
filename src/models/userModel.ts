import mongoose from 'mongoose';
import IUser from '../interfaces/IUser';
import isEmail from 'validator/es/lib/isEmail';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validator: [isEmail, 'Invalid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password confirmation is required']
  },
  profileImage: {
    type: String,
    required: [true, 'Profile image is required']
  },
  followedShops: {
    type: [String],
    default: []
  },
  starredProducts: {
    type: [String],
    default: []
  },
  ownedShops: {
    type: [String],
    default: []
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
