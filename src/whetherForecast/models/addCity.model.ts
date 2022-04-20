import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddCityModel {
  @Field()
  success: boolean
}
