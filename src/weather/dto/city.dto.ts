import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export default class CityArgs {
  @Field()
  city: string;

  @Field()
  userId: number;
}
