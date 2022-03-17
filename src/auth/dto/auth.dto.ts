import {ArgsType, Field, InputType} from "@nestjs/graphql";

@InputType()
@ArgsType()
export class authArgs {
    @Field()
    email: string

    @Field()
    password: string
}

@ArgsType()
export class tokenArg {
    @Field()
    access_token: string
}
