import catchAsync from '../utils/catchAsync';
import IDatabase from '../interfaces/IDatabase';
import jwt from 'jsonwebtoken';

const signUp = (database: IDatabase) =>
  catchAsync(async (req, res) => {
    const doc = await database.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    res.status(201).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

const logIn = (database: IDatabase) => catchAsync(async (req, res, next) => {});

export default { signUp, logIn };
