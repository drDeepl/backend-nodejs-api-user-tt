import Joi from 'joi';
export class CreateUserDto {
  private readonly schema = Joi.object({
    firstName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')),
  });

  readonly firstName: string;
  readonly email: string;
  readonly password: string;

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
