import express from 'express';
import ProfileController from '../Controllers/profile.controller';
import auth from '../middlewares/auth';
import validate from '../middlewares/validate';
import userValidation from '../validations/user.validations';
import profileValidation from '../validations/profile.validations';
import { multerMiddleware } from '../middlewares/file';
export const profileRouter = express.Router();

profileRouter
  .route('/upload')
  .put(auth, multerMiddleware, ProfileController.uploadPhoto);

profileRouter
  .route('/profiles')
  .get(
    validate(profileValidation.getProfilesSchemaValidate),
    ProfileController.getProfiles,
  );

profileRouter
  .route('/:id')
  .put(
    auth,
    validate(userValidation.editUserSchemaValidate),
    ProfileController.editUserInfoById,
  );

profileRouter
  .route('/:id')
  .get(
    auth,
    validate(profileValidation.getProfileSchemaValidate),
    ProfileController.getProfile,
  );
