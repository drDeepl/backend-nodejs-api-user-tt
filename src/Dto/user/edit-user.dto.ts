export class EditUserDto {
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
}
