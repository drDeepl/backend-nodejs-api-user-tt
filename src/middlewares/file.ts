import * as path from 'path';
import config from '../Config/env.config';
import { Request, Response } from 'express';
import multer from 'multer';
import { extensions, mimeTypes } from '../utils/constants';
import * as fs from 'fs';
import { encodeBase64 } from '../utils/bcrypt';
import { WriteFileError } from '../errors/WriteFileError';
import InvalidFileExtensionError from '../errors/InvalideFileExtension.Error';
import FileExistsError from '../errors/FileExistsError';
const uploadFilePath = path.resolve(
  __dirname,
  '../..',
  config.file.pathUpload.photo,
);

const checkDirExistsElseCreateOrCallbackError = (
  dirName: string,
  callback: any,
): void => {
  console.log('checkDirExistsElseCreateOrCallbackError');
  fs.access(dirName, fs.constants.F_OK, (errAccess) => {
    if (errAccess) {
      console.log('ACCESS ERROR: ' + errAccess.message);
      fs.mkdir(dirName, { recursive: true }, (err) => {
        if (err) {
          console.log('MKDIR ERROR: ' + err.message);
          console.log(err);
          callback(new WriteFileError());
        }
        callback(null, dirName);
      });
    } else {
      callback(null, dirName);
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
    const userDir: string = `${uploadFilePath}\\${req.user.id}`;
    checkDirExistsElseCreateOrCallbackError(userDir, callback);
  },
  filename(
    req: Request | any,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ): void {
    console.log('STORAGE FILE');
    const filename = `${encodeBase64(file.originalname)}${path.extname(
      file.originalname,
    )}`;
    console.log(`FILENAME: ${filename}`);
    const filePath = `${uploadFilePath}\\${req.user.id}\\${filename}`;
    if (fs.existsSync(filePath)) {
      callback(new FileExistsError(), '');
    } else {
      callback(null, filename);
    }
  },
});

const multerMiddleware = multer({
  storage: storageFile,
  // limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req: Request, file: Express.Multer.File, callback) => {
    console.log('FILE');
    console.log(file);
    const extension: boolean =
      extensions.indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    console.log(`ORIGINAL FILE NAME: ${file.originalname}`);
    const mimeType: boolean = mimeTypes.indexOf(file.mimetype) >= 0;
    if (extension && mimeType) {
      callback(null, true);
    } else {
      callback(new InvalidFileExtensionError());
    }
  },
}).single('photo');

export { multerMiddleware };
