class ApiError {
  statusCode: number;
  isOperational: boolean;
  stack: string;
  message: string | undefined;

  constructor(
    statusCode: number,
    message: string | undefined,
    isOperational = true,
    stack = '',
  ) {
    this.statusCode = statusCode;
    this.stack = stack;
    this.isOperational = isOperational;
    this.message = message;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
