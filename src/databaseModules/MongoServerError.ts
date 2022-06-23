class MongoServerError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.name = 'MongoServerError';
    this.code = code;
  }
}

export default MongoServerError;
