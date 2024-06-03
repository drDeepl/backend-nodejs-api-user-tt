import Joi from 'joi';
export class CreateUserDto {
  private readonly schema = Joi.object({
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
  });

  firstName: string;
  email: string;
  password: string;

  constructor(firstName: string, email: string, password: string) {
    this.firstName = firstName;
    this.email = email;
    this.password = password;
  }

  validate(): Joi.ValidationResult<CreateUserDto> {
    return this.schema.validate({
      firstName: this.firstName,
      email: this.email,
      password: this.password,
    });
  }
}
