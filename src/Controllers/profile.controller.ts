import { NextFunction, Request, Response } from 'express';
import UserService from '../Services/user.service';
import ProfileService from '../Services/profile.service';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { EditUserDto } from '../Dto/user/edit-user.dto';
import { EditedUserDtoInterface } from '../interfaces/edited-user.dto.interface';
import UserDto from '../Dto/user/user.dto';
import FileNotExists from '../errors/FileNotExists';
import { AuthUserInterface } from '../interfaces/AuthUserInterface';
import { DataUploadInterface } from '../interfaces/DataUploadInterface';

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

  async getProfile(req: Request, res: Response, next: NextFunction) {
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
    try {
      if (!req.file) {
        throw new FileNotExists();
      }
      const dataUpload: DataUploadInterface = req.file;
      const authUser = req.user as AuthUserInterface;
      const photoUrl: string = await ProfileService.saveDataUpload(
        dataUpload,
        authUser.id,
      );
      return res.status(httpStatus.OK).json({ photo: photoUrl });
    } catch (error) {
      next(error);
    }
  }
  async getProfiles(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('ProfileController.getUsers');
      const page = req.query.page ?? '';
      const profiles: UserDto[] = await ProfileService.getProfilesByPage(+page);
      return res.status(httpStatus.OK).json({ profiles });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProfileController();
