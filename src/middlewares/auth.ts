// import passport from 'passport';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
// import { jwtStrategy } from '../Config/passport.config';
// import { jwtVerify } from '../Config/passport.config';
import { verify } from 'jsonwebtoken';
import config from '../Config/env.config';
import UnauthorizedError from '../errors/UnauthorizedError';
import prisma from '../../prisma';
import ForbiddenError from '../errors/ForbiddenError';

const verifyCallback = (
  req: any,
  resolve: (value?: unknown) => void,
  reject: (reason?: unknown) => void,
) => async (err: unknown, user: User | false, info: unknown) => {
  console.log('verifyCallback');

  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Ошибка авторизации'));
  }
  req.user = user;
  // if (req.params.userId !== user.id) {
  //   return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
  // }

  resolve();
};

// const auth = (...requiredRights: string[]) => async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   console.log('auth');

//   return new Promise((resolve, reject) => {
//     passport.authenticate(
//       'jwt',
//       { session: false },
//       verifyCallback(req, resolve, reject),
//     )(req, res, next);
//   })
//     .then(() => next())
//     .catch((err) => next(err));
// };

const auth = async (req: Request, res: Response, next: NextFunction) => {
  console.log('auth');
  try {
    const { authorization } = req.headers;
    if (authorization === undefined) {
      throw new UnauthorizedError();
    }
    // Cut the received string and takes the token at position 1.
    const token = (authorization && authorization.split(' ')[1]) || '';
    console.log(token);
    const payload: any = verify(token, config.jwt.secret);

    if (!payload) {
      throw new UnauthorizedError();
    }
    const user = await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });

    if (!user) throw new UnauthorizedError();

    const { passwordHash, ...loggedUser } = user;
    req.user = loggedUser;

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default auth;
