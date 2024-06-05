import * as path from 'path';
import config from '../Config/env.config';
import { Request, Response } from 'express';
import multer from 'multer';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import { RequestExtended } from '../interfaces/request-extended';
import UnauthorizedError from '../errors/UnauthorizedError';
import * as fs from 'fs';
const uploadFilePath = path.resolve(
  __dirname,
  '../..',
  config.file.pathUpload.photo,
);

const checkDirExistsAndCallback = (
  dirName: string,
  filename: string,
  cb: (error: Error | null, filename: string) => void,
) => {
  fs.access(dirName, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(dirName, (err) => {
        if (err) {
          cb(new ApiError(httpStatus.BAD_GATEWAY, 'что-то пошло не так'), '');
        } else {
          cb(null, filename);
        }
      });
    } else {
      cb(null, filename);
    }
  });
};

const storageFile: multer.StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: any) => {
    console.log('DESTINATION FILE');

    cb(null, `${uploadFilePath}`);
  },
  filename(
    req: RequestExtended,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ): void {
    console.log('STORAGE FILE');
    console.log(file);
    const filename = `${req.user.id}\\${file.originalname}`;
    const userDir = `${uploadFilePath}\\${req.user.id}`;
    checkDirExistsAndCallback(userDir, filename, cb);
  },
});

const multerMiddleware = multer({
  storage: storageFile,
  // limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req: RequestExtended, file: Express.Multer.File, callback) => {
    console.log('FILE');
    console.log(file);
    console.log(Object.keys(req.user));
    const extensions: Array<string> = ['.png', '.jpg', '.jpeg'];
    const extension: boolean =
      extensions.indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType: boolean =
      ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;
    if (extension && mimeType) {
      const filePath = `${uploadFilePath}\\${req.user.id}\\${file.originalname}`;
      console.log(filePath);
      if (fs.existsSync(filePath)) {
        callback(
          new ApiError(
            httpStatus.BAD_REQUEST,
            'загружаемый файл усже существует',
          ),
        );
      } else {
        return callback(null, true);
      }
    }

    callback(
      new ApiError(
        httpStatus.BAD_REQUEST,
        `Неправильный тип файла. Разрешены файлы с расширением ${extensions.join(
          ', ',
        )}`,
      ),
    );
  },
}).single('photo');

export { multerMiddleware };
