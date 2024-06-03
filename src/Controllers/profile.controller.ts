import { Request, Response } from 'express';
import UserService from '../Services/user.service';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { EditUserDto } from '../Dto/user/edit-user.dto';

import { EditedUserDtoInterface } from '../Dto/user/interfaces/edited-user.dto.interface';

class ProfileController {
  editUserInfoById = async (req: Request, res: Response) => {
    try {
      const editUserDto: EditUserDto = new EditUserDto(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.sex,
      );
      const { error, value } = editUserDto.validate();
      if (error) {
        const errorMessage = error.details
          .map((details) => details.message)
          .join(', ');
        console.log(errorMessage);
        const statusCode = httpStatus.BAD_REQUEST;
        res.status(statusCode).send(new ApiError(statusCode, errorMessage));
      } else {
        const editedUser: EditedUserDtoInterface =
          await UserService.editUserById(+req.params.userId, editUserDto);
        res.status(httpStatus.OK).send(editedUser);
      }
    } catch (error: any) {
      res.status(error.statusCode).send(error);
    }
  };
}

export default new ProfileController();
