import { Request, Response } from 'express';
import UserService from '../Services/user.service';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { CreateUserDto } from '../Dto/user/create-user.dto';

import TokenService from '../Services/token.service';
import { User } from '@prisma/client';
import config from '../Config/env.config';

import { LogInUserDto } from '../Dto/user/login-user.dto';
import { TokensType } from '../Services/types/TokensType';

class UserController {
  async register(req: Request, res: Response) {
    try {
      const dto: CreateUserDto = new CreateUserDto(
        req.body.firstName,
        req.body.email,
        req.body.password,
      );
      const createdUser: User = await UserService.createUser(dto);
      const tokens: TokensType = TokenService.generateTokens(createdUser.id);
      res.status(httpStatus.CREATED).send(tokens);
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
    try {
      const logInUserDto: LogInUserDto = new LogInUserDto(
        req.body.email,
        req.body.password,
      );
      const tokens = await UserService.logIn(logInUserDto);
      res.status(httpStatus.OK).send(tokens);
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
}

export default new UserController();
