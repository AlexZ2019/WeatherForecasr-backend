import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class UserModel {
  @Field()
  id: number;

  @Field()
  email: string;
}
