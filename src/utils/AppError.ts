class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Remove the AppError object from the stack trace.
    Error.captureStackTrace(this, this.constructor);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError;
