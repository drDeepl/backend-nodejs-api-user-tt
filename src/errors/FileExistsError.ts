import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

export class FileExistsError extends ApiError {
  constructor(
    statusCode: number = httpStatus.BAD_REQUEST,
    message: string = 'Загружаемый файл уже существует',
  ) {
    super(statusCode, message);
  }
}

export default FileExistsError;
