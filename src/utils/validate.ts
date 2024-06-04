import Joi from 'joi';

export const getValidationMessage = (error: Joi.ValidationError): string => {
  const errorMessage = error.details
    .map((details) => details.message)
    .join(', ');
  return errorMessage;
};
