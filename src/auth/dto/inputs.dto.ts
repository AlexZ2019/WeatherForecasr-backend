import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export default class AuthArgs {
  @Field()
  email: string;

  @Field()
  password: string;
}
