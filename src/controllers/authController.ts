import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';
import Database from '../databaseModules/Database';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';
import { Response } from 'express';
import { UserDocument } from '../models/userModel';

const userDatabase = new Database(User);

const sendTokenRes = (
  user: UserDocument,
  statusCode: number,
  res: Response,
) => {
  // Check for the JWT details in environment variables
  if (!process.env.JWT_SECRET) {
    throw new AppError('JWT_SECRET is not defined.', 500);
  }
  if (!process.env.JWT_EXPIRES_IN) {
    throw new AppError('JWT_EXPIRES_IN is not defined.', 500);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + Number(process.env.JWT_EXPIRES_IN)),
    secure: true,
    httpOnly: true,
    sameSite: true,
  });

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signUp = catchAsync(async (req, res) => {
  const doc = await userDatabase.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    accountType: req.body.accountType,
  });

  sendTokenRes(doc, 201, res);
});

const logIn = catchAsync(async (req, res, next) => {
  // Check the request for email and password
  if (!req.body.email || !req.body.password) {
    return next(new AppError('Please provide an email and password.', 400));
  }

  const doc = await userDatabase.findOne({ email: req.body.email });

  if (!doc || !(await doc.comparePassword(req.body.password))) {
    return next(new AppError('Email or password is incorrect.', 401));
  }

  sendTokenRes(doc, 200, res);
});

const changePassword = catchAsync(async (req, res, next) => {
  // Make sure route is protected and user is logged in
  if (!req.user) {
    return next(
      new AppError('This route is not protected, but should be', 500),
    );
  }

  // Check current password
  if (!req.body.currentPassword)
    return next(new AppError('Please provide your current password.', 400));
  const user = await userDatabase.findById(req.user._id);
  if (!user || !(await user.comparePassword(req.body.currentPassword))) {
    return next(new AppError('Current password is incorrect.', 401));
  }

  // Update password
  if (!req.body.password)
    return next(new AppError('Please provide a new password.', 400));
  if (!req.body.passwordConfirm)
    return next(new AppError('Please confirm your new password.', 400));
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  sendTokenRes(user, 200, res);
});

const protect = catchAsync(async (req, res, next) => {
  // Check for the JWT details in environment variables
  if (!process.env.JWT_SECRET) {
    return next(new AppError('JWT_SECRET is not defined.', 500));
  }

  // Check whether token exists and is formatted properly
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return next(
      new AppError(
        'You are not logged in. Please log in perform this operation.',
        401,
      ),
    );
  }

  // Check whether token is valid and not expired
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Check for whether the user exists in the database
  if (typeof decoded === 'string')
    return next(new AppError('Payload does not exist in JWT token.', 401));

  const user = await userDatabase.findOne({ _id: decoded.id });
  if (!user) {
    return next(
      new AppError(
        'The user that this token belongs to no longer exists.',
        401,
      ),
    );
  }

  // Check whether password has been changed since the token was issued
  if (!decoded.iat)
    return next(
      new AppError(
        'JWT token does not have a "issued at" property in payload',
        401,
      ),
    );

  if (user.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError('Password has changed, please log in again.', 401),
    );
  }

  // Token authorized
  req.user = user;
  next();
});

export default { signUp, logIn, changePassword, protect };
