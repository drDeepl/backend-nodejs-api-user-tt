import Joi from 'joi';

const getProfileSchemaValidate = {
  param: {
    id: Joi.number().required().messages({
      'any.required': 'пропущен параметр "id"',
    }),
  },
};

const getProfilesSchemaValidate = {
  query: {
    page: Joi.number().required().min(1).messages({
      'any.required': 'пропущен параметр "page"',
      'number.min': '"page" должно быть больше 0',
    }),
  },
};

export default { getProfileSchemaValidate, getProfilesSchemaValidate };
