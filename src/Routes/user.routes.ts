import express from 'express';
import UserController from '../Controllers/user.controller';

export const userRouter = express.Router();

userRouter.post('/register', UserController.register);

