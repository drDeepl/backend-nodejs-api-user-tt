import { Request, Response } from 'express';
import UserService from '../Services/user.service';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { CreateUserDto } from '../Dto/user/create-user.dto';

import TokenService from '../Services/token.service';
import { User } from '@prisma/client';
import config from '../Config/env.config';

import { LogInUserDto } from '../Dto/user/login-user.dto';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const dto: CreateUserDto = new CreateUserDto(
        req.body.firstName,
        req.body.email,
        req.body.password,
      );
      const createdUser: User = await UserService.createUser(dto);
      const accessToken: string = await TokenService.generateJWT(
        createdUser.id,
        Number(config.jwt.accessExpirationMonites) * 60,
      );
      const refreshToken: string = await TokenService.generateJWT(
        createdUser.id,
        Number(config.jwt.refreshExpirationDays) * 24 * 3600,
      );
      res.status(httpStatus.CREATED).send({ accessToken, refreshToken });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).send(error);
      } else {
        res
          .status(httpStatus.BAD_GATEWAY)
          .send(new ApiError(httpStatus.BAD_GATEWAY, 'что-то пошло не так'));
      }
    }
  }

  async login(req: Request, res: Response) {
    const logInUserDto: LogInUserDto = new LogInUserDto(
      req.body.email,
      req.body.password,
    );
    res.status(httpStatus.OK).send(logInUserDto);
  }
}

export default new UserController();
