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
      .messages({
        'string.empty': 'поле с паролем не может быть пустым',
        'any.required': 'пароль является обязательным полем',
        'string.pattern':
          'пароль должен содержать буквы латинского алфавита и иметь длину от 5 до 30 символов',
      })
      .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')),
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

export default { createUserSchemaValidate, logInUserSchemaValidate };
