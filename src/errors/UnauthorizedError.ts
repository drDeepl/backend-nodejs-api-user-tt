import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

class UnauthorizedError extends ApiError {
  constructor(
    statusCode: number = httpStatus.UNAUTHORIZED,
    message: string = 'Ошибка авторизации',
  ) {
    super(statusCode, message);
  }
}

export default UnauthorizedError;
