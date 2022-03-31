import { Args, Context, GraphQLExecutionContext, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { Tokens } from './types';
import { AuthArgs } from './dto/inputs.dto';
import { UserModel } from './models/user.model';
import { Token } from './models/tokens.model';
import { ApolloError } from 'apollo-server-express';

@Resolver(() => UserModel)
export class AuthResolver {

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {
  }

  @Query(() => UserModel)
  @UseGuards(GqlAuthGuard)
  async getUser(@Context() context: GraphQLExecutionContext): Promise<UserModel | undefined> {

    return this.usersService.getUser(context['req'].user.email);
  }

  @Mutation(() => Token)
  async login(@Args() authArgs: AuthArgs): Promise<Tokens> {
    return this.authService.login(authArgs);
  }

  @Mutation(() => Token)
  async refreshToken(@Context() context: GraphQLExecutionContext): Promise<Tokens> {
    const token = context['req'].headers.authorization.replace('Bearer ', '');
    try {
      return this.authService.refreshToken(token);
    }
    catch {
      throw new ApolloError("refresh token is expired", "400")
    }
  }

}
