import { Injectable, UseGuards } from '@nestjs/common';
import { Context, Query, Resolver } from '@nestjs/graphql';
import UserModel from './models/user.model';
import AccessTokenGuard from '../auth/guards/accessToken.guard';
import UserService from './user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from '../auth/entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
@Resolver(() => UserModel)
class UserResolver {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Token) private readonly tokenRepository: Repository<Token>
  ) {}

  @Query(() => UserModel)
  @UseGuards(AccessTokenGuard)
  async getCurrentUser(@Context() context): Promise<UserModel | undefined> {
    const tokens = await this.tokenRepository.findBy({userId: context.req.user.id});
    if (tokens.some((token) => token.accessToken === context.req.headers.authorization.replace('Bearer ', ''))) {
      return this.userService.getUserByEmail(context.req.user.email);
    }
  }
}

export default UserResolver;
