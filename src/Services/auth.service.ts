import { CreateUserDto } from '../Dto/user/create-user.dto';

class AuthService {
  createUser(dto: CreateUserDto) {
    console.log(dto);
  }
}

export default new AuthService();
