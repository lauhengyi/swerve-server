import { Request, Response } from 'express';
import AppError from '../utils/AppError';

const errorController = (
  err: AppError | Error,
  req: Request,
  res: Response
) => {
  let statusCode: number;
  let status: string;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
  } else {
    status = 'error';
    statusCode = 500;
  }

  res.status(statusCode).json({
    status: status,
    message: err.message
  });
};

export default errorController;
