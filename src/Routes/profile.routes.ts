import express from 'express';
import ProfileController from '../Controllers/profile.controller';
import auth from '../middlewares/auth';
import validate from '../middlewares/validate';
import userValidation from '../validations/user.validations';

export const profileRouter = express.Router();

profileRouter
  .route('/:id')
  .put(
    auth(''),
    validate(userValidation.editUserSchemaValidate),
    ProfileController.editUserInfoById,
  );

profileRouter.get(
  '/:id',
  validate(userValidation.getUserSchemaValidate),
  ProfileController.getUserInfoById,
);
