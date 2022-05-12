import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export default class AddCityArgs {
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

}
