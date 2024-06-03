import express from 'express';
import ProfileController from '../Controllers/profile.controller';

export const profileRouter = express.Router();

profileRouter.put('/:userId', ProfileController.editUserInfoById);
