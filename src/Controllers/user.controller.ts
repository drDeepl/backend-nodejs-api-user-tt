import { Request, Response } from 'express';
import UserService from '../Services/user.service';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { CreateUserDto } from '../Dto/user/create-user.dto';
import TokenService from '../Services/token.service';
import { User } from '@prisma/client';
import config from '../Config/env.config';
import { getValidationMessage } from '../utils/validate';

class UserController {
  register = async (req: Request, res: Response) => {
    try {
      const createUserDto: CreateUserDto = new CreateUserDto(
        req.body.firstName,
        req.body.email,
        req.body.password,
      );
      const { error, value } = createUserDto.validate();
      if (error) {
        const errorMessage: string = getValidationMessage(error);

        const statusCode = httpStatus.BAD_REQUEST;
        res.status(statusCode).send(new ApiError(statusCode, errorMessage));
      } else {
        const createdUser: User = await UserService.createUser(createUserDto);
        const accessToken: string = await TokenService.generateJWT(
          createdUser.id,
          Number(config.jwt.accessExpirationMonites) * 60,
        );

        const refreshToken: string = await TokenService.generateJWT(
          createdUser.id,
          Number(config.jwt.refreshExpirationDays) * 24 * 3600,
        );

        res.status(httpStatus.CREATED).send({ accessToken, refreshToken });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) {
        res.status(error.statusCode).send(error);
      } else {
        res
          .status(httpStatus.BAD_GATEWAY)
          .send(new ApiError(httpStatus.BAD_GATEWAY, 'что-то пошло не так'));
      }
    }
  };
}

export default new UserController();
