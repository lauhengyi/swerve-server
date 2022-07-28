import mongoose, { Document, Types } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcryptjs';

interface IUser {
  username: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  profileImage: string;
  followedShops: string[];
  accountType: 'regular' | 'merchant';
  ownedShops: string[];
  dateCreated: number;
  isPublic: boolean;
  isAdmin: boolean;
}

interface IUserMethods {
  comparePassword: (givenPassword: string) => Promise<boolean>;
}

type UserModel = mongoose.Model<IUser, object, IUserMethods>;

type UserDocument = Document<unknown, object, IUser> &
  IUser & {
    _id: Types.ObjectId;
  } & IUserMethods;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    validate: [isEmail, 'Invalid email.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password confirmation is required.'],
    validate: {
      // This only works on create and save
      validator: function (this: IUser, input: string) {
        return input === this.password;
      },
      message: 'Passwords are not the same.',
    },
  },
  profileImage: {
    type: String,
    default: './default-profile-image.png',
  },
  followedShops: {
    type: [String],
    default: [],
  },
  ownedShops: {
    type: [String],
    default: [],
  },
  accountType: {
    type: String,
    required: true,
    enum: {
      values: ['regular', 'merchant'],
      message: 'Account type must be either regular or merchant.',
    },
  },
  dateCreated: {
    type: Number,
    default: Date.now(),
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  // Only hash password if it has been modified
  if (!this.isModified('password')) return next();

  // Hash the password with a salt of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Remove passwordConfirm field
  this.passwordConfirm = undefined;
});

userSchema.methods.comparePassword = async function (givenPassword: string) {
  return await bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export { UserDocument };
export default User;
