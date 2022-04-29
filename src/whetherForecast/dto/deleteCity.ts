import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteCityArgs {
  @Field()
  userId: number;

  @Field()
  cityId: number;
}
