import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';
import Database from '../databaseModules/Database';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';

const userDatabase = new Database(User);

const signup = catchAsync(async (req, res, next) => {
  // Check for the JWT details in environment variables
  if (!process.env.JWT_SECRET) {
    return next(new AppError('JWT_SECRET is not defined', 500));
  }
  if (!process.env.JWT_EXPIRES_IN) {
    return next(new AppError('JWT_EXPIRES_IN is not defined', 500));
  }

  const doc = await userDatabase.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    accountType: req.body.accountType
  });

  const token = jwt.sign({ id: doc._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      doc
    }
  });
});

export default { signup };
