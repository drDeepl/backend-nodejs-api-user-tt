import express from 'express';
import ProfileController from '../Controllers/profile.controller';
import auth from '../middlewares/auth';

export const profileRouter = express.Router();

profileRouter
  .route('/:userId')
  .put(auth(''), ProfileController.editUserInfoById);
