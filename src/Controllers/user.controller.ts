import { Request, Response } from 'express';
import { CreateUserDto } from '../Dto/user/create-user.dto';
import UserService from '../Services/user.service';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

class UserController {
  register = async (req: Request, res: Response) => {
    const createUserDto: CreateUserDto = new CreateUserDto(
      req.body.firstName,
      req.body.email,
      req.body.password,
    );

    const { error, value } = createUserDto.validate();
    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      console.log(errorMessage);
      const statusCode = httpStatus.BAD_REQUEST;
      res.status(statusCode).send(new ApiError(statusCode, errorMessage));
    } else {
      await UserService.createUser(createUserDto);
      res.status(httpStatus.CREATED).send(value);
    }
  };
}

export default new UserController();
