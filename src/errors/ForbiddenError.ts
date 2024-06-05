import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

class ForbiddenError extends ApiError {
  constructor(statusCode: number = httpStatus.FORBIDDEN, message: string = '') {
    super(statusCode, message);
  }
}

export default ForbiddenError;
