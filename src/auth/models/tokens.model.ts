import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Token {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
