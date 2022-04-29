import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserId {
  @Field()
  userId: number;
}
