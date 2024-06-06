import { User } from '@prisma/client';

class UserDto {
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  createdAt: string;

  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.sex = user.sex;
    this.createdAt = user.createdAt.toISOString();
  }
}

export default UserDto;
