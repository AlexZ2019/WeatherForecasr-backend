import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export default class CityIdArgs {
  @Field()
  cityId: number;
}
