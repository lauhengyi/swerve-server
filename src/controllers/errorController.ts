import IAppError from '../interfaces/IAppError';
import { Request, Response } from 'express';

const errorController = (err: IAppError, req: Request, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};

export default errorController;
