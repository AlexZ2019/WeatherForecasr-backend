import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Injectable, UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import AuthArgs from './dto/inputs.dto';
import Tokens from './models/tokens.model';
import RefreshTokenGuard from './guards/refreshToken.guard';
import AccessTokenGuard from './guards/accessToken.guard';

@Injectable()
@Resolver(() => Tokens)
export default class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Tokens)
  async login(@Args() authArgs: AuthArgs): Promise<Tokens> {
    return this.authService.login(authArgs);
  }

  @Mutation(() => Tokens)
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Context() context): Promise<Tokens> {
    return this.authService.refreshToken(context.req.user, context.req.headers.authorization.replace('Bearer', ''));
  }

  @Mutation(() => Boolean)
  @UseGuards(AccessTokenGuard)
  async logout(@Context() context) {
    return this.authService.logout(context.user.id, context.req.headers.authorization.replace('Bearer', ''));
  }
}

