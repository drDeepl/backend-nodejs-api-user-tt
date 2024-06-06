import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { extensions } from '../utils/constants';

class InvalidFileExtensionError extends ApiError {
  constructor(
    statusCode: number = httpStatus.BAD_REQUEST,
    message: string = `Неправильный тип файла. Допустимы файлы с расширением ${extensions.join(
      ', ',
    )}`,
  ) {
    super(statusCode, message);
  }
}

export default InvalidFileExtensionError;
