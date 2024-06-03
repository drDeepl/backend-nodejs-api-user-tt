import Joi from 'joi';
export class EditUserDto {
  private readonly schema = Joi.object({
    firstName: Joi.string().default(''),
    lastName: Joi.string().default(''),
    email: Joi.string().required().messages({
      'string.empty': 'поле "электронная почта" не может быть пустым',
      'any.required': 'поле "электронная почта" является обязательным',
    }),
    sex: Joi.string().default(''),
  });

  firstName: string;
  lastName: string;
  email: string;
  sex: string;

  constructor(firstName: string, lastName: string, email: string, sex: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.sex = sex;
  }

  validate(): Joi.ValidationResult<EditUserDto> {
    return this.schema.validate({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      sex: this.sex,
    });
  }
}
