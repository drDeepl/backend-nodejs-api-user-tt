import * as path from 'path';
import config from '../Config/env.config';
import { Request, Response } from 'express';
import multer from 'multer';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';

const uploadFilePath = path.resolve(
  __dirname,
  '../..',
  config.file.pathUpload.photo,
);

const storageFile: multer.StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: any) => {
    console.log('DESTINATION FILE');
    cb(null, uploadFilePath);
  },
  filename(
    req: Request,
    file: Express.Multer.File,
    fn: (error: Error | null, filename: string) => void,
  ): void {
    console.log('STORAGE FILE');
    console.log(file);
    fn(null, `${file.fieldname}${path.extname(file.originalname)}`);
  },
});

const multerMiddleware = multer({
  storage: storageFile,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req: Request, file: Express.Multer.File, callback) => {
    console.log('FILE FILTER');
    console.log(file);
    const extensions: Array<string> = ['.png', '.jpg', '.jpeg'];
    const extension: boolean =
      extensions.indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
    const mimeType: boolean =
      ['image/png', 'image/jpg', 'image/jpeg'].indexOf(file.mimetype) >= 0;
    if (extension && mimeType) {
      return callback(null, true);
    }

    callback(
      new Error(
        `Неправильный тип файла. Разрешены файлы с расширением ${extensions.join(
          ', ',
        )}`,
      ),
    );
  },
}).single('photo');

// const handleSingleUploadFile = async (
//   req: Request,
//   res: Response,
// ): Promise<any> => {
//   console.warn('handleSingleUploadFile');

//   return await new Promise((resolve, reject): void => {
//     console.warn('handleSingleUploadFile.IN PROMISE');
//     uploadFile(req, res, (error) => {
//       if (error) {
//         console.log('ERROR');
//         reject(error);
//       }

//       resolve({ file: req.file, body: req.body });
//     });
//   });
// };

export { multerMiddleware };
