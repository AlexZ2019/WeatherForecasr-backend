import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export default class DeleteCityArgs {

  @Field()
  cityId: number;
}
