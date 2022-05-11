import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user';
import UserService from './user.service';
import UserResolver from './user.resolver';
import { Token } from '../auth/entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export default class UserModule {}
