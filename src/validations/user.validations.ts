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
    firstName: Joi.string().messages({
      'string.empty': 'поле "имя" не может быть пустым',
    }),
    lastName: Joi.string().messages({
      'string.empty': 'поле "фамилия" не может быть пустым',
    }),
    email: Joi.string().messages({
      'string.empty': 'поле "электронная почта" не может быть пустым',
    }),
    sex: Joi.string().messages({
      'string.empty': 'поле "пол" не может быть пустым',
    }),
  },
};

const getUserSchemaValidate = {
  param: {
    id: Joi.number().required().messages({
      'any.required': 'пропущен параметр id',
    }),
  },
};

export default {
  createUserSchemaValidate,
  logInUserSchemaValidate,
  editUserSchemaValidate,
  getUserSchemaValidate,
};
