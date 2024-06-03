import { Prisma } from '@prisma/client';
import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import config from '../Config/env.config';
import logger from '../Config/logger';
import ApiError from '../utils/ApiError';

export const errorConverter: ErrorRequestHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof Prisma.PrismaClientKnownRequestError
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.DEV_STATUS === 'prod' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }
  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.DEV_STATUS === 'develop' && { stack: err.stack }),
  };

  if (config.DEV_STATUS === 'develop') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
