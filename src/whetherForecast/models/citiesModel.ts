import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CitiesModel {

  @Field()
  name: string;

  @Field()
  country: string;

  @Field()
  lat: number;

  @Field()
  lon: number;

  @Field()
  state: string;
}
