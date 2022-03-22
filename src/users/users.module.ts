import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "./entities/usersEntity";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersService],
  exports: [UsersService]
})

export class UsersModule {}
