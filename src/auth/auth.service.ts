import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GraphQLError } from 'graphql';
import { ACCESS_TOKEN_TIMEOUT, REFRESH_TOKEN_TIMEOUT } from './constants';
import { Tokens } from './types';
import AuthArgs from './dto/inputs.dto';
import comparePassword from './utils/comparePassword';
import UserService from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>
  ) {
  }

  private generateTokens(payload) {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_AT_SECRET'),
        expiresIn: ACCESS_TOKEN_TIMEOUT
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_RT_SECRET'),
        expiresIn: REFRESH_TOKEN_TIMEOUT
      })
    };
  }

  public async login(user: AuthArgs): Promise<Tokens> {
    const existedUser = await this.usersService.getUserByEmail(user.email);
    if (existedUser) {
      const matched = comparePassword(user.password, existedUser.password);
      if (matched) {
        const payload = {
          email: existedUser.email,
          id: existedUser.id
        };
        const tokens = this.generateTokens(payload);
        await this.tokenRepository.save({
          userId: existedUser.id,
          ...tokens
        });
        return tokens;
      }
    }
    if (!existedUser) {
      throw new GraphQLError('Invalid Credentials');
    }
  }

  public async refreshToken(payload) {
    const newTokens = this.generateTokens(payload);
    await this.tokenRepository.save({
      userId: payload.id,
      ...newTokens
    });
    return newTokens;
  }

  public getTokens(userId: number) {
    return this.tokenRepository.findBy({ userId });
  }

  public logout(userId: number) {
    console.log(userId);
    return this.tokenRepository.delete({ userId });
  }
}
