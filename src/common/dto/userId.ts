import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export default class UserId {
  @Field()
  userId: number;
}
