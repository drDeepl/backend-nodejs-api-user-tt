import { Photo, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import { DataUploadInterface } from '../interfaces/DataUploadInterface';
import ApiError from '../utils/ApiError';
import { PrismaExceptionHandler } from '../utils/PrismaExceptionHandler';
import { photoPrismaErrorMessage } from '../utils/errorMessages';
import prisma from '../../prisma';
import config from '../Config/env.config';
import { UserExtendedPhoto } from '../interfaces/UserExtendedPhotoInterface';
import UserDto from '../Dto/user/user.dto';

class ProfileService {
  private readonly userExceptionHandler = new PrismaExceptionHandler(
    photoPrismaErrorMessage,
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

  async getProfilesByPage(page: number, countProfilesByPage: number = 10) {
    try {
      const profiles: UserExtendedPhoto[] = await prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          passwordHash: true,
          sex: true,
          createdAt: true,
          photo: true,
        },
        skip: (page - 1) * countProfilesByPage,
        take: countProfilesByPage,
        orderBy: { createdAt: 'desc' },
      });
      return profiles.map((profile) => new UserDto(profile));
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw this.userExceptionHandler.handleError(error);
      } else if (error instanceof ApiError) {
        throw new ApiError(error.statusCode, error.message);
      } else {
        throw new ApiError(httpStatus.BAD_GATEWAY, 'что-то пошло не так');
      }
    }
  }
}

export default new ProfileService();
