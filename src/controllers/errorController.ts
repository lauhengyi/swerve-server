import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import AppError from '../utils/AppError';

const handleCastErrorDB = (err: mongoose.Error.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: mongoose.Error.ValidationError) => {
  return new AppError(err.message, 400);
};

type clientError =
  | Error
  | AppError
  | mongoose.Error.CastError
  | mongoose.Error.ValidationError;

const errorController = (
  err: clientError,
  req: Request,
  res: Response,
  // Disabled cause the last variable is required for express to see this module as the error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (err instanceof mongoose.Error.CastError) err = handleCastErrorDB(err);
  if (err instanceof mongoose.Error.ValidationError)
    err = handleValidationErrorDB(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // console.error({ err });
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};

export default errorController;
