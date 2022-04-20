import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CityArgs {
  @Field()
  city: string;
}
