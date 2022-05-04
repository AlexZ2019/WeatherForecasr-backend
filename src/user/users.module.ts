import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user';
import UsersService from './users.service';
import UserResolver from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserResolver],
  exports: [UsersService],
})
export default class UsersModule {}
