import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AddCityArgs {

  @Field()
  name: string;

  @Field()
  country: string;

  @Field()
  lat: string;

  @Field()
  lon: string;

  @Field()
  state: string;

  @Field()
  userId: number
}
