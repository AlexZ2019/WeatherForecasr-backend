import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Tokens {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
