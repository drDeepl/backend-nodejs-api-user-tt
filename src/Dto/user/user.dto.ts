import { UserEntityWithPhoto } from '../../Services/types/UserEntityWithPhoto';

class UserDto {
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  createdAt: string;
  photo: string | null;

  constructor(user: UserEntityWithPhoto) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.sex = user.sex;
    this.createdAt = user.createdAt.toISOString();
    this.photo = user.photo ? user.photo.fileName : null;
  }
}

export default UserDto;
