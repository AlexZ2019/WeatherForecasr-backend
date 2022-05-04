import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GraphQLError } from 'graphql';
import { ACCESS_TOKEN_TIMEOUT, REFRESH_TOKEN_TIMEOUT } from './constants';
import { Tokens } from './types';
import AuthArgs from './dto/inputs.dto';
import comparePassword from './utils/comparePassword';
import UsersService from '../user/users.service';

@Injectable()
export default class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private generateTokens(payload) {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: ACCESS_TOKEN_TIMEOUT,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: REFRESH_TOKEN_TIMEOUT,
      }),
    };
  }

  public async login(user: AuthArgs): Promise<Tokens> {
    const existedUser = await this.usersService.getUserByEmail(user.email);
    if (existedUser) {
      const matched = comparePassword(user.password, existedUser.password);
      if (matched) {
        const payload = {
          email: existedUser.email,
          id: existedUser.id,
        };

        return this.generateTokens(payload);
      }
    }
    if (!existedUser) {
      throw new GraphQLError('Invalid Credentials');
    }
  }

  public refreshToken(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('JWT_SECRET'),
    });

    const payload = {
      email: decoded.email,
      id: decoded.id,
    };

    return this.generateTokens(payload);
  }
}
