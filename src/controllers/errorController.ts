import { Request, Response } from 'express';
import AppError from '../utils/AppError';

const errorController = (err: AppError, req: Request, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

export default errorController;
