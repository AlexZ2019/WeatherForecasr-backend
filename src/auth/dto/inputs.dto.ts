import {ArgsType, Field, InputType} from "@nestjs/graphql";

@InputType()
@ArgsType()
export class AuthArgs {
    @Field()
    email: string

    @Field()
    password: string
}
