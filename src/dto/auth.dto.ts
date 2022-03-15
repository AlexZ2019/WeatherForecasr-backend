import {ArgsType, Field} from "@nestjs/graphql";

@ArgsType()
export class authArgs {
    @Field()
    email: string

    @Field()
    password: string
}
