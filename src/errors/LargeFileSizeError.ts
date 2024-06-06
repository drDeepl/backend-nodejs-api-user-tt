import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

class LargeFileSizeError extends ApiError {
  constructor(
    statusCode: number = httpStatus.BAD_REQUEST,
    message: string = 'Размер файла превышает допустимый',
  ) {
    super(statusCode, message);
  }
}

export default LargeFileSizeError;
