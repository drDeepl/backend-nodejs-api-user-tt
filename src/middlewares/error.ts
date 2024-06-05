import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import logger from '../Config/logger';
import ApiError from '../utils/ApiError';

export const errors = (
  error: Error & Partial<ApiError>,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(error);
  console.log(error.message);
  const statusCode = error.statusCode ?? httpStatus.BAD_GATEWAY;
  const message = error.statusCode ? error.msg : 'что-то пошло не так';

  return res.status(statusCode).json({ message: message });
};
