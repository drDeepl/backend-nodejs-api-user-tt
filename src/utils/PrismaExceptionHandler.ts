import ApiError from './ApiError';
import httpStatus from 'http-status';

export class PrismaExceptionHandler {
  private readonly errorMessages: {
    [key: string]: { statusCode: number; description: string };
  };
  constructor(errorMessages: {
    [key: string]: { statusCode: number; description: string };
  }) {
    this.errorMessages = errorMessages;
  }
  public handleError(error: any): ApiError {
    if (error.code in this.errorMessages) {
      return new ApiError(
        this.errorMessages[error.code].statusCode,
        this.errorMessages[error.code].description,
      );
    }
    console.error(`Prisma Error: ${error.message}`);
    return new ApiError(httpStatus.BAD_GATEWAY, error.message);
  }
}
