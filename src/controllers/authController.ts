import User from '../models/userModel';
import catchAsync from '../utils/catchAsync';
import Database from '../databaseModules/Database';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';

const userDatabase = new Database(User);

const signUp = catchAsync(async (req, res, next) => {
  // Check for the JWT details in environment variables
  if (!process.env.JWT_SECRET) {
    return next(new AppError('JWT_SECRET is not defined.', 500));
  }
  if (!process.env.JWT_EXPIRES_IN) {
    return next(new AppError('JWT_EXPIRES_IN is not defined.', 500));
  }

  const doc = await userDatabase.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    accountType: req.body.accountType,
  });

  const token = jwt.sign({ id: doc._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      doc,
    },
  });
});

const logIn = catchAsync(async (req, res, next) => {
  // Check for the JWT details in environment variables
  if (!process.env.JWT_SECRET) {
    return next(new AppError('JWT_SECRET is not defined.', 500));
  }
  if (!process.env.JWT_EXPIRES_IN) {
    return next(new AppError('JWT_EXPIRES_IN is not defined.', 500));
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
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
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
  if (typeof decoded === 'string') {
    return next(new AppError('Payload does not exist in jwt token.', 401));
  }
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

  // Token authorized
  req.user = user;
  next();
});

export default { signUp, logIn, protect };
