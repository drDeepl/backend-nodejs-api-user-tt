import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import logger from '../Config/logger';
import ApiError from '../utils/ApiError';
import multer, { MulterError } from 'multer';
import MulterErrorHandler from '../utils/MulterErrorHandler';

export const errors = (
  error: Error & Partial<ApiError>,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(error);
  console.log(error.message);
  if (error instanceof multer.MulterError) {
    const multerError = error as multer.MulterError;
    const handleError = new MulterErrorHandler(multerError.code);
    return res
      .status(handleError.statusCode)
      .json({ message: handleError.message });
  } else {
    const statusCode = error.statusCode ?? httpStatus.BAD_GATEWAY;
    const message = error.statusCode ? error.msg : 'что-то пошло не так';
    return res.status(statusCode).json({ message: message });
  }
};
