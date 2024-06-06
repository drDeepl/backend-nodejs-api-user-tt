import config from '../../Config/env.config';
import { UserExtendedPhoto } from '../../interfaces/UserExtendedPhotoInterface';

class UserDto {
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  createdAt: string;
  photos: string[];

  constructor(user: UserExtendedPhoto) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.sex = user.sex;
    this.createdAt = user.createdAt.toISOString();
    this.photos = user.photo.map(
      (photo) => `${config.file.pathUpload.photo}/${user.id}/${photo.fileName}`,
    );
  }
}

export default UserDto;
