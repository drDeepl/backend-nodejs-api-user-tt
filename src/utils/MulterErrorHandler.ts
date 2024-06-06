import httpStatus from 'http-status';
import { fileSizeMB } from '../middlewares/file';

class MulterErrorHandler {
  private readonly descriptionCode: { [key: string]: string } = {
    LIMIT_FILE_SIZE: `Файл не может быть больше ${fileSizeMB} МБ`,
    LIMIT_PART_COUNT: 'Количество файлов превышает установленный лимит.',
    LIMIT_FIELD_COUNT: 'Количество полей превышает установленный лимит.',
  };
  readonly statusCode: number;
  readonly message: string;

  constructor(code: string) {
    if (!this.descriptionCode[code]) {
      this.statusCode = httpStatus.BAD_GATEWAY;
      this.message = 'Ошибка при сохранении файла';
    } else {
      this.statusCode = httpStatus.BAD_REQUEST;
      this.message = this.descriptionCode[code];
    }
  }
}

export default MulterErrorHandler;
