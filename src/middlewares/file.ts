import * as path from 'path';
import config from '../Config/env.config';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import { extensions, mimeTypes } from '../utils/constants';
import * as fs from 'fs';
import { encodeBase64 } from '../utils/bcrypt';

import InvalidFileExtensionError from '../errors/InvalideFileExtension.Error';
import FileExistsError from '../errors/FileExistsError';

const uploadFilePath = path.resolve(
  __dirname + `../../../public/${config.file.pathUpload.photo}`,
);

// const uploadFilePath = path.resolve(
//   __dirname,
//   '../../public',
//   config.file.pathUpload.photo,
// );

console.log(uploadFilePath);

const fileSizeMB: number = 10;

const checkDirExistsElseCreateOrCallbackError = async (
  dirName: string,
  callback: any,
): Promise<void> => {
  console.log('checkDirExistsElseCreateOrCallbackError');
  console.log(`DIR ${dirName}`);
  await fs.promises.mkdir(dirName, { recursive: true });
  callback(null, dirName);
};

const storageFile: multer.StorageEngine = multer.diskStorage({
  destination: async (
    req: Request | any,
    file: Express.Multer.File,
    callback: any,
  ) => {
    const userDir: string = `${uploadFilePath}\\${req.user.id}`;
    checkDirExistsElseCreateOrCallbackError(userDir, callback);
  },
  filename: async (
    req: Request | any,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ): Promise<void> => {
    const filename = `${encodeBase64(file.originalname)}${path.extname(
      file.originalname,
    )}`;

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
  fileFilter: async (req: Request, file: Express.Multer.File, callback) => {
    console.log('FILE');
    console.log(file);
    console.log(`KEYS FILE: ${Object.keys(file)}`);
    const extension: boolean =
      extensions.indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType: boolean = mimeTypes.indexOf(file.mimetype) >= 0;
    if (extension && mimeType) {
      callback(null, true);
    } else {
      callback(new InvalidFileExtensionError());
    }
  },
  limits: { fileSize: fileSizeMB * 1024 * 1024 + 1 },
}).single('photo');

export { multerMiddleware, fileSizeMB };
