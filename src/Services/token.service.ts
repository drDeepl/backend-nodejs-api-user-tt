import jwt from 'jsonwebtoken';
import config from '../Config/env.config';

class TokenService {
  async generateJWT(userId: number, expiresIn: number): Promise<string> {
    let payload = {
      sub: userId,
    };

    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: expiresIn,
    });
  }
}

export default new TokenService();
