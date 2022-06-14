import { Request, Response } from 'express';
import IDatabase from '../interfaces/IDatabase';

const createOneFactory = (database: IDatabase) => {
  return async (req: Request, res: Response) => {
    try {
      const doc = await database.create(req.body);
      res.status(201).json({
        status: 'success',
        data: {
          doc
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

const getOneFactory = (database: IDatabase) => {
  return async (req: Request, res: Response) => {
    try {
      const doc = await database.find(req.params.id);
      res.status(200).json({
        status: 'success',
        data: {
          doc
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

const queryAllFactory = (database: IDatabase) => {
  return async (req: Request, res: Response) => {
    try {
      const doc = await database.query(req.query);
      res.status(200).json({
        status: 'success',
        data: {
          doc
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

const updateOneFactory = (database: IDatabase) => {
  return async (req: Request, res: Response) => {
    try {
      const doc = await database.update(req.params.id, req.body);
      res.status(200).json({
        status: 'success',
        data: {
          doc
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

const deleteOneFactory = (database: IDatabase) => {
  return async (req: Request, res: Response) => {
    try {
      await database.delete(req.params.id);
      res.status(204);
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };
};

export default {
  createOneFactory,
  getOneFactory,
  queryAllFactory,
  updateOneFactory,
  deleteOneFactory
};
