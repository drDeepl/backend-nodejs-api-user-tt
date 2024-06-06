import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVarsSchema = Joi.object()
  .keys({
    DEV_STATUS: Joi.string().valid('prod', 'develop', 'test').required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.string().default('60m'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.string().default('7d'),
    DATABASE_URL: Joi.string().required(),
    PATH_UPLOAD_PHOTO: Joi.string().required().default('/uploads/photo'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  DEV_STATUS: envVars.DEV_STATUS,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMonites: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
  file: {
    pathUpload: {
      photo: envVars.PATH_UPLOAD_PHOTO,
    },
  },
};
