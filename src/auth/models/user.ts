import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field()
    email: string

    @Field()
    password: string

    @Field()
    userId: string
}

@ObjectType()
export class Token {
    @Field()
    access_token: string
}
