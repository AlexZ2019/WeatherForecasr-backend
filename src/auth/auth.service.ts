import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_TIMEOUT, REFRESH_TOKEN_TIMEOUT } from './constants';
import { Tokens } from './types';
import { ConfigService } from '@nestjs/config';
import { AuthArgs } from './dto/inputs.dto';
import { comparePassword } from './utils/comparePassword';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
  };

  private generateTokens(payload) {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: ACCESS_TOKEN_TIMEOUT
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: REFRESH_TOKEN_TIMEOUT
      })
    };
  }

  public async login(user: AuthArgs): Promise<Tokens> {

    const existedUser = await this.usersService.getUser(user.email);
    if (existedUser) {
      const matched = comparePassword(user.password, existedUser.password);
      if (matched) {
        const payload = {
          email: existedUser.email,
          userId: existedUser.id
        };

        return this.generateTokens(payload);
      }
    }
    if (!existedUser) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'Invalid Credentials' },
        HttpStatus.NOT_FOUND);
    }
  };

  public refreshToken(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('JWT_SECRET')
    });

    const payload = {
      email: decoded.email,
      userId: decoded.userId
    };

    return this.generateTokens(payload);
  }
}
