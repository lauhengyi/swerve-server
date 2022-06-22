import IDatabase from '../interfaces/IDatabase';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';

const createOneFactory = (database: IDatabase) =>
  catchAsync(async (req, res) => {
    const doc = await database.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

const getOneFactory = (database: IDatabase) =>
  catchAsync(async (req, res, next) => {
    const doc = await database.find(req.params.id);

    if (!doc) {
      return next(new AppError('Not document found with this ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

const queryAllFactory = (database: IDatabase) =>
  catchAsync(async (req, res, next) => {
    const doc = await database.query(req.query);

    if (!doc) {
      return next(new AppError('Not document found with this ID', 404));
    }

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc
      }
    });
  });

const updateOneFactory = (database: IDatabase) =>
  catchAsync(async (req, res, next) => {
    const doc = await database.update(req.params.id, req.body);

    if (!doc) {
      return next(new AppError('Not document found with this ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

const deleteOneFactory = (database: IDatabase) =>
  catchAsync(async (req, res, next) => {
    const doc = await database.delete(req.params.id);

    if (!doc) {
      return next(new AppError('Not document found with this ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  });

export default {
  createOneFactory,
  getOneFactory,
  queryAllFactory,
  updateOneFactory,
  deleteOneFactory
};
