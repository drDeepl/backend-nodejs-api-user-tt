// import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

import { NextFunction, Request, Response } from 'express';

import { TokenExpiredError, verify } from 'jsonwebtoken';
import config from '../Config/env.config';
import UnauthorizedError from '../errors/UnauthorizedError';
import prisma from '../../prisma';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  console.log('auth user');
  try {
    const { authorization } = req.headers;
    if (authorization === undefined) {
      throw new UnauthorizedError();
    }

    const token = (authorization && authorization.split(' ')[1]) || '';
    console.log(token);
    const payload: any = verify(token, config.jwt.secret);

    if (!payload) {
      throw new UnauthorizedError();
    }
    const user = await prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        id: payload.sub,
      },
    });

    if (!user) throw new UnauthorizedError();
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: 'время действия токена истекло' });
    }
    next(error);
  }
};

export default auth;
