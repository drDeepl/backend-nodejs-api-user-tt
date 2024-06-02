import express from 'express';
import AuthController from '../Controllers/auth.controller';

export const authRouter = express.Router();

authRouter.post('/register', AuthController.createUser);
