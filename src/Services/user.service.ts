import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from '../Dto/user/create-user.dto';
import prisma from '../../prisma';
import { hashData, compareDataHash } from '../utils/bcrypt';
import { userPrismaErrorMessage } from '../utils/errorMessages';
import { PrismaExceptionHandler } from '../utils/PrismaExceptionHandler';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { EditUserDto } from '../Dto/user/edit-user.dto';

import { EditedUserDtoInterface } from '../interfaces/edited-user.dto.interface';
import { LogInUserDto } from '../Dto/user/login-user.dto';
import tokenService from './token.service';
import UserDto from '../Dto/user/user.dto';
import { UserEntityWithPhoto } from './types/UserEntityWithPhoto';

class UserService {
  private readonly userExceptionHandler = new PrismaExceptionHandler(
    userPrismaErrorMessage,
  );
  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      dto.password = await hashData(dto.password);
      const createdUser: User = await prisma.user.create({
        data: {
          firstName: dto.firstName,
          passwordHash: dto.password,
          email: dto.email,
        },
      });
      return createdUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw this.userExceptionHandler.handleError(error);
      } else {
        throw new ApiError(httpStatus.BAD_GATEWAY, 'что-то пошло не так');
      }
    }
  }

  async logIn(dto: LogInUserDto) {
    const user = await prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user === null) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Данного пользователя не существует',
      );
    }
    if (await compareDataHash(dto.password, user.passwordHash)) {
      return tokenService.generateTokens(user.id);
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, 'неверный пароль');
    }
  }

  async editUserById(
    userId: number,
    dto: EditUserDto,
  ): Promise<EditedUserDtoInterface> {
    console.log(dto);
    return prisma.user
      .update({
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
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw this.userExceptionHandler.handleError(error);
        } else {
          throw new ApiError(httpStatus.BAD_GATEWAY, 'что-то пошло не так');
        }
      });
  }

  async getUserInfoById(userId: number): Promise<UserDto> {
    try {
      const user: UserEntityWithPhoto | null = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          photo: true,
        },
      });

      if (user === null) {
        console.log(user);
        throw new ApiError(httpStatus.NOT_FOUND, 'пользователь не найден');
      }
      return new UserDto(user);
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

export default new UserService();
