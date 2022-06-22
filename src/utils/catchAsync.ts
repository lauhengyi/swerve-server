import { Request, Response, NextFunction } from 'express';

type middlewareFn = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const catchAsync =
  (fn: middlewareFn): middlewareFn =>
  (req, res, next) => {
    return fn(req, res, next).catch((err) => next(err));
  };

export default catchAsync;
