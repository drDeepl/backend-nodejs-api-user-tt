import { Prisma } from '@prisma/client';
import { CreateUserDto } from '../Dto/user/create-user.dto';
import prisma from '../../prisma';
import { hashData } from '../utils/bcrypt';
import { userPrismaErrorMessage } from '../utils/errorMessages';
import { PrismaExceptionHandler } from '../utils/PrismaExceptionHandler';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { EditUserDto } from '../Dto/user/edit-user.dto';

import { EditedUserDtoInterface } from '../Dto/user/interfaces/edited-user.dto.interface';

class UserService {
  private readonly userExceptionHandler = new PrismaExceptionHandler(
    userPrismaErrorMessage,
  );
  async createUser(dto: CreateUserDto): Promise<void> {
    try {
      dto.password = await hashData(dto.password);
      await prisma.user.create({
        data: {
          firstName: dto.firstName,
          passwordHash: dto.password,
          email: dto.email,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw this.userExceptionHandler.handleError(error);
      } else {
        throw new ApiError(httpStatus.BAD_GATEWAY, 'что-то пошло не так');
      }
    }
  }

  async editUserById(
    userId: number,
    dto: EditUserDto,
  ): Promise<EditedUserDtoInterface> {
    try {
      return prisma.user.update({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          sex: true,
        },
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          sex: dto.sex,
        },
        where: { id: userId },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw this.userExceptionHandler.handleError(error);
      } else {
        throw new ApiError(httpStatus.BAD_GATEWAY, 'что-то пошло не так');
      }
    }
  }
}

export default new UserService();
