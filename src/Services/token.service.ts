import jwt from 'jsonwebtoken';
import config from '../Config/env.config';
import { TokensType } from './types/TokensType';

class TokenService {
  async generateJWT(userId: number, expiresIn: number): Promise<string> {
    let payload = {
      sub: userId,
    };

    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: expiresIn,
    });
  }

  generateTokens(userId: number): TokensType {
    let payload = {
      sub: userId,
    };

    const accessToken: string = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.accessExpirationMonites,
    });
    const refreshToken: string = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.refreshExpirationDays,
    });

    return { accessToken, refreshToken };
  }
}

export default new TokenService();
