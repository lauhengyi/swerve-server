import User from '../models/userModel';
import Database from '../databaseModules/Database';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';

const userDatabase = new Database(User);

const deleteMe = catchAsync(async (req, res, next) => {
  // Make sure route is protected and user is logged in
  if (!req.user) {
    return next(
      new AppError('This route is not protected, but should be', 500),
    );
  }

  const doc = await userDatabase.delete(req.user._id);

  if (!doc) {
    return next(new AppError('User already deleted', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export default { deleteMe };
