import ApiError from './ApiError';
import httpStatus from 'http-status';

export class PrismaExceptionHandler {
  private readonly errorMessages: { [key: string]: string };
  constructor(errorMessages: { [key: string]: string }) {
    this.errorMessages = errorMessages;
  }
  public handleError(error: any): void {
    if (error.code in this.errorMessages) {
      console.error(`Prisma Error: ${this.errorMessages[error.code]}`);
    } else {
      console.error(`Prisma Error: ${error.message}`);
    }
  }
}
