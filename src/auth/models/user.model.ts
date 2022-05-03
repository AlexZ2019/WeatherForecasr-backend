import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class UserModel {
  @Field()
  userId: string;

  @Field()
  email: string;
}
