import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CityIdArgs {
  @Field()
  cityId: number;
}
