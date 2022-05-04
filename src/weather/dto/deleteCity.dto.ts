import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export default class DeleteCityArgs {
  @Field()
  userId: number;

  @Field()
  cityId: number;
}
