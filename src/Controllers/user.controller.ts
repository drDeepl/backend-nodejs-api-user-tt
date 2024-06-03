import { Request, Response } from 'express';
import { CreateUserDto } from '../Dto/user/create-user.dto';

class UserController {
  register = async (req: Request, res: Response) => {
    const createUserDto: CreateUserDto = new CreateUserDto(
      req.body.firstName,
      req.body.email,
      req.body.password,
    );

    const { error, value } = createUserDto.validate();
    if (error) {
      res.send(error.message);
    } else {
      res.status(201).send(value);
    }
  };
}

export default new UserController();
