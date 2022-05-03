import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import { Tokens } from './types';
import AuthService from './auth.service';
import AuthArgs from './dto/inputs.dto';
import GqlAuthGuard from './guards/gql-auth.guard';
import Token from './models/tokens.model';
import UserModel from './models/user.model';
import UsersService from '../users/users.service';

@Injectable()
@Resolver(() => UserModel)
export default class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Query(() => UserModel)
  @UseGuards(GqlAuthGuard)
  async getUser(@Context() context): Promise<UserModel | undefined> {
    const userInfo = await this.usersService.getUser(context.req.user.email);
    return {
      userId: userInfo.userId,
      email: userInfo.email,
    };
  }

  @Mutation(() => Token)
  async login(@Args() authArgs: AuthArgs): Promise<Tokens> {
    return this.authService.login(authArgs);
  }

  @Mutation(() => Token)
  @UseGuards(GqlAuthGuard)
  async refreshToken(@Context() context): Promise<Tokens> {
    const token = context.req.headers.authorization.replace('Bearer ', '');
    return this.authService.refreshToken(token);
  }
}
