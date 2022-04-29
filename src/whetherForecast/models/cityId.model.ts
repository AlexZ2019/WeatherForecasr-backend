import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CityIdModel {

  @Field()
  cityId: number
}
