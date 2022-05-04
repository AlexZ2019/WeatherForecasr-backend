import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import UserModel from './models/user.model';
import GqlAuthGuard from '../auth/guards/gql-auth.guard';
import UsersService from './users.service';

@Injectable()
@Resolver(() => UserModel)
class UserResolver {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Query(() => UserModel)
  @UseGuards(GqlAuthGuard)
  async getUser(@Context() context): Promise<UserModel | undefined> {
    const userInfo = await this.usersService.getUserByEmail(context.req.user.email);
    return {
      id: userInfo.id,
      email: userInfo.email,
    };
  }
}

export default UserResolver;
