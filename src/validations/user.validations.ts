import Joi from 'joi';

const createUserSchemaValidate = {
  body: {
    firstName: Joi.string().required().messages({
      'string.empty': 'поле с именем не может быть пустым',
      'any.required': 'имя является обязательным полем',
    }),
    email: Joi.string().required().messages({
      'string.empty': 'поле с электронная почтой не может быть пустым',
      'any.required': 'электронная почта является обязательным полем',
    }),
    password: Joi.string()
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$'))
      .messages({
        'string.empty': 'поле с паролем не может быть пустым',
        'any.required': 'пароль является обязательным полем',
        'string.pattern.base':
          'пароль должен содержать буквы латинского алфавита и иметь длину от 5 до 30 символов',
      }),
  },
};

const logInUserSchemaValidate = {
  body: {
    email: Joi.string().required().messages({
      'string.empty': 'поле с электронная почтой не может быть пустым',
      'any.required': 'электронная почта является обязательным полем',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'поле с паролем не может быть пустым',
      'any.required': 'пароль является обязательным полем',
    }),
  },
};

const editUserSchemaValidate = {
  body: {
    firstName: Joi.string().default(''),
    lastName: Joi.string().default(''),
    email: Joi.string().required().messages({
      'string.empty': 'поле "электронная почта" не может быть пустым',
      'any.required': 'поле "электронная почта" является обязательным',
    }),
    sex: Joi.string().default(''),
  },
};

export default {
  createUserSchemaValidate,
  logInUserSchemaValidate,
  editUserSchemaValidate,
};
