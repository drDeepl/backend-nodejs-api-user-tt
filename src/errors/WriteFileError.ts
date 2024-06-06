import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

export class WriteFileError extends ApiError {
  constructor(
    statusCode: number = httpStatus.BAD_GATEWAY,
    message: string = 'Ошибка сохранения файла',
  ) {
    super(statusCode, message);
  }
}

export default WriteFileError;
