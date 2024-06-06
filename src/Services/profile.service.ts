import { Photo, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { DataUploadInterface } from '../interfaces/DataUploadInterface';
import ApiError from '../utils/ApiError';
import { PrismaExceptionHandler } from '../utils/PrismaExceptionHandler';
import { userPrismaErrorMessage } from '../utils/errorMessages';
import prisma from '../../prisma';
import config from '../Config/env.config';

class ProfileService {
  private readonly userExceptionHandler = new PrismaExceptionHandler(
    userPrismaErrorMessage,
  );

  async saveDataUpload(
    dataUpload: DataUploadInterface,
    userId: number,
  ): Promise<string> {
    try {
      console.log('UPLOAD DATA');
      console.log(dataUpload);
      const savedPhotoUser: Photo = await prisma.photo.create({
        data: {
          fileName: dataUpload.filename,
          path: dataUpload.destination,
          userId: userId,
        },
      });
      return `${config.file.pathUpload.photo}/${userId}/${savedPhotoUser.fileName}`;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw this.userExceptionHandler.handleError(error);
      } else {
        throw new ApiError(httpStatus.BAD_GATEWAY, 'что-то пошло не так');
      }
    }
  }
}

export default new ProfileService();
