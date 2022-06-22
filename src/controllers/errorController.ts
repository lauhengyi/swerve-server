import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/AppError';

const errorController = (
  err: AppError | Error,
  req: Request,
  res: Response,
  // Disabled cause the last variable is required for express to see this module as the error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let statusCode: number;
  let status: string;
  let isOperational = false;

  // Setting default status as 'error' and default statusCode as 500
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
    isOperational = true;
  } else {
    status = 'error';
    statusCode = 500;
  }

  if (isOperational) {
    res.status(statusCode).json({
      status: status,
      message: err.message
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};

export default errorController;
