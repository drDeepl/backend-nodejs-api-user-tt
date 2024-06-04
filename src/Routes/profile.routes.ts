import express from 'express';
import ProfileController from '../Controllers/profile.controller';
import auth from '../middlewares/auth';
import validate from '../middlewares/validate';
import userValidation from '../validations/user.validations';

export const profileRouter = express.Router();

profileRouter
  .route('/:userId')
  .put(
    auth(''),
    validate(userValidation.editUserSchemaValidate),
    ProfileController.editUserInfoById,
  );
