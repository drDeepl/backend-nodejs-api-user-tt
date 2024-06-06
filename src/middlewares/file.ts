import * as path from 'path';
import config from '../Config/env.config';
import { Request, Response } from 'express';
import multer from 'multer';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

import * as fs from 'fs';
import { encodeBase64 } from '../utils/bcrypt';
import { WriteFileError } from '../errors/WriteFileError';
const uploadFilePath = path.resolve(
  __dirname,
  '../..',
  config.file.pathUpload.photo,
);

const checkDirExistsElseCreateOrCallbackError = (
  dirName: string,
  cb: multer.FileFilterCallback,
): void => {
  console.log('checkDirExistsElseCreateOrCallbackError');
  fs.access(dirName, fs.constants.F_OK, (errAccess) => {
    if (errAccess) {
      console.log('ACCESS ERROR: ' + errAccess.message);
      fs.mkdir(dirName, { recursive: true }, (err) => {
        if (err) {
          console.log('MKDIR ERROR: ' + err.message);
          console.log(err);
          cb(new WriteFileError());
        }
        return;
      });
    } else {
      return;
    }
  });
};

const storageFile: multer.StorageEngine = multer.diskStorage({
  destination: (
    req: Request | any,
    file: Express.Multer.File,
    callback: any,
  ) => {
    console.log('DESTINATION FILE');

    callback(null, `${uploadFilePath}\\${req.user?.id}`);
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ): void {
    console.log('STORAGE FILE');
    console.log(file);
    const filename = `${encodeBase64(file.originalname)}${path.extname(
      file.originalname,
    )}`;
    console.log(`FILENAME: ${filename}`);
    const filePath = `${uploadFilePath}\\${filename}`;
    console.log(filePath);
    if (fs.existsSync(filePath)) {
      cb(
        new ApiError(httpStatus.BAD_REQUEST, 'загружаемый файл уже существует'),
        '',
      );
    }
  },
});

const multerMiddleware = multer({
  storage: storageFile,
  // limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req: Request, file: Express.Multer.File, callback) => {
    console.log('FILE');
    console.log(file);

    const extensions: Array<string> = ['.png', '.jpg', '.jpeg'];
    const extension: boolean =
      extensions.indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType: boolean =
      ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;
    if (extension && mimeType) {
      callback(null, true);
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
