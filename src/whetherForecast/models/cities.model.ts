import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CitiesModel {

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
