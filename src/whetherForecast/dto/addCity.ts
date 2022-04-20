import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AddCityArgs {

  @Field()
  name: string;

  @Field()
  country: string;

  @Field()
  lat: number;

  @Field()
  lon: number;

  @Field()
  state: string;

  @Field()
  userId: number
}
