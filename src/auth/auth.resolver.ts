import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import { Tokens } from './types';
import AuthService from './auth.service';
import AuthArgs from './dto/inputs.dto';
import GqlAuthGuard from './guards/gql-auth.guard';
import Token from './models/tokens.model';
import UsersService from '../user/users.service';

@Injectable()
@Resolver(() => Token)
export default class AuthResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

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
