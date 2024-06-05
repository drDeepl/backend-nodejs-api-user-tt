import { NextFunction, Request, Response } from 'express';
import UserService from '../Services/user.service';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { EditUserDto } from '../Dto/user/edit-user.dto';

import { EditedUserDtoInterface } from '../interfaces/edited-user.dto.interface';
import UserDto from '../Dto/user/user.dto';
import { RequestExtended } from '../interfaces/request-extended';

class ProfileController {
  async editUserInfoById(req: Request, res: Response) {
    try {
      const editUserDto: EditUserDto = new EditUserDto(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.sex,
      );
      const editedUser: EditedUserDtoInterface = await UserService.editUserById(
        +req.params.userId,
        editUserDto,
      );
      res.status(httpStatus.OK).send(editedUser);
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

  async getUserInfoById(req: Request, res: Response, next: NextFunction) {
    try {
      const userDto: UserDto = await UserService.getUserInfoById(
        Number(req.params.id),
      );
      res.status(httpStatus.OK).send(userDto);
    } catch (error) {
      next(error);
    }
  }

  async uploadPhoto(req: Request, res: Response, next: NextFunction) {
    console.log('ProfileController.uploadPhoto');
    try {
      if (!req.file) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Файл не найден');
      }
      const dataUpload = {
        fileName: req.file?.filename,
        path: req.file?.path,
      };
      return res
        .status(httpStatus.OK)
        .json({ message: 'файл успешно добавлен' });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProfileController();
