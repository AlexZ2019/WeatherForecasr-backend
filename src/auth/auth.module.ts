import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import AuthResolver from './auth.resolver';
import AuthService from './auth.service';
import UserModule from '../user/user.module';
import AtStrategy from './strategies/at.strategy';
import RtStrategy from './strategies/rt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    TypeOrmModule.forFeature([Token])
  ],
  providers: [AuthResolver, AuthService, AtStrategy, RtStrategy],
  exports: [AuthService]
})
export default class AuthModule {}
