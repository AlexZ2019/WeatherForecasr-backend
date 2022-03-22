import {ArgsType, Field} from "@nestjs/graphql";

@ArgsType()
export class AccessToken {
    @Field()
    accessToken: string
}

