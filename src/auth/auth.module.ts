import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import AuthResolver from './auth.resolver';
import AuthService from './auth.service';
import UserModule from '../user/user.module';
import AccessTokenStrategy from './strategies/accessToken.strategy';
import RefreshTokenStrategy from './strategies/refreshToken.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([Token])
  ],
  providers: [AuthResolver, AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  exports: [AuthService]
})
export default class AuthModule {}
