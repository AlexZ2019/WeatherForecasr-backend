import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class SuccessModel {
  @Field()
  success: boolean;
}
