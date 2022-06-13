import { Request, Response } from 'express';
import IDatabase from '../interfaces/IDatabase';

const createOne = (database: IDatabase) => {
  return async (req: Request, res: Response) => {
    try {
      const product = await database.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          product
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };
};

const getOne = (database: IDatabase) => {
  return async (req: Request, res: Response) => {
    try {
      const product = await database.find(req.params.id);
      res.status(200).json({
        status: 'success',
        data: {
          product
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
};

const queryOne = (req: Request, res: Response) => {};

const updateOne = (req: Request, res: Response) => {};

const deleteOne = (req: Request, res: Response) => {};

export { getOne, createOne, updateOne, deleteOne };
