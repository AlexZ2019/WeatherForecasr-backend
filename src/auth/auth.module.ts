import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import AuthResolver from './auth.resolver';
import AuthService from './auth.service';
import UsersModule from '../user/users.module';
import JwtStrategy from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
})
export default class AuthModule {}
