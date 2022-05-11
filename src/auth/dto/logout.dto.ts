import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class logoutArgs {
  @Field()
  userId: number;

}
