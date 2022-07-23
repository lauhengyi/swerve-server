import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import AppError from '../utils/AppError';
import MongoServerError from '../databaseModules/MongoServerError';

const handleCastErrorDB = (err: mongoose.Error.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: mongoose.Error.ValidationError) => {
  let message = '';
  Object.keys(err.errors).forEach((key) => {
    message += err.errors[key].message + ' ';
  });
  // Remove last space
  message = message.slice(0, -1);
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: MongoServerError) => {
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
  const name_1 = err.message.match(/\w*_1\b/);

  if (!value || !name_1) return err;

  const name = name_1[0].slice(0, -2);

  const message = `The ${name}, ${value[0]}, is already taken.`;
  return new AppError(message, 400);
};

type clientError =
  | Error
  | AppError
  | mongoose.Error.CastError
  | mongoose.Error.ValidationError
  | MongoServerError;

const errorController = (
  err: clientError,
  req: Request,
  res: Response,
  // Disabled cause the last variable is required for express to see this module as the error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof mongoose.Error.CastError) err = handleCastErrorDB(err);
  if (err instanceof mongoose.Error.ValidationError)
    err = handleValidationErrorDB(err);
  if (err.name === 'MongoServerError' && 'code' in err && err.code === 11000)
    err = handleDuplicateFieldsDB(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // console.error({ err });
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
      err: err.message,
    });
  }
};

export default errorController;
