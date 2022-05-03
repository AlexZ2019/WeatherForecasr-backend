import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class CityIdModel {
  @Field()
  cityId: number;
}
