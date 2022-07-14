import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';
import Database from '../databaseModules/Database';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';

const userDatabase = new Database(User);

const signUp = catchAsync(async (req, res, next) => {
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

const logIn = catchAsync(async (req, res, next) => {
  // Check for the JWT details in environment variables
  if (!process.env.JWT_SECRET) {
    return next(new AppError('JWT_SECRET is not defined', 500));
  }
  if (!process.env.JWT_EXPIRES_IN) {
    return next(new AppError('JWT_EXPIRES_IN is not defined', 500));
  }

  // Check the request for email and password
  if (!req.body.email || !req.body.password) {
    return next(new AppError('Please provide an email and password.', 400));
  }

  const doc = await userDatabase.findOne({ email: req.body.email });

  if (!doc || !(await doc.comparePassword(req.body.password))) {
    return next(new AppError('Email or password is incorrect.', 401));
  }

  const token = jwt.sign({ id: doc._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
    status: 'success',
    token
  });
});

export default { signUp, logIn };
