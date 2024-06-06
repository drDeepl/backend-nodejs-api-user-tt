import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

export class FileNotExists extends ApiError {
  constructor(
    statusCode: number = httpStatus.BAD_REQUEST,
    message: string = 'Файл не найден',
  ) {
    super(statusCode, message);
  }
}

export default FileNotExists;
