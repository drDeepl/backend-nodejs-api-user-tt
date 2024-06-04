import express from 'express';
import UserController from '../Controllers/user.controller';
import validate from '../middlewares/validate';
import userValidation from '../validations/user.validations';

export const userRouter = express.Router();

userRouter.post(
  '/register',
  validate(userValidation.createUserSchemaValidate),
  UserController.register,
);

userRouter.post(
  '/login',
  validate(userValidation.logInUserSchemaValidate),
  UserController.login,
);
