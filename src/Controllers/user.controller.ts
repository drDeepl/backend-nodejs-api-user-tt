import { NextFunction, Request, Response } from 'express';
import UserService from '../Services/user.service';
import httpStatus from 'http-status';

import { CreateUserDto } from '../Dto/user/create-user.dto';

import TokenService from '../Services/token.service';
import { User } from '@prisma/client';

import { LogInUserDto } from '../Dto/user/login-user.dto';
import { TokensType } from '../Services/types/TokensType';

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
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
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const logInUserDto: LogInUserDto = new LogInUserDto(
        req.body.email,
        req.body.password,
      );
      const tokens = await UserService.logIn(logInUserDto);
      res.status(httpStatus.OK).send(tokens);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
