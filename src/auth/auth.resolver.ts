import {Args, Context, GraphQLExecutionContext, Mutation, Query, Resolver} from "@nestjs/graphql";
import {Token, User} from "./models/user";
import {AuthArgs} from "./dto/auth.dto";

import {UsersService} from "../users/users.service";
import {AuthService} from "./auth.service";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "./guards/gql-auth.guard";
import {Tokens} from "./types";

@Resolver(() => User)
export class AuthResolver {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    async getAuth( @Context() context: GraphQLExecutionContext): Promise<User> {
        const token = context["req"].headers.authorization.replace('Bearer ', '')
        return this.authService.tokenVerify(token);
    }

    @Mutation(() => Token)
    async getLogin(@Args() authArgs: AuthArgs): Promise<Tokens> {
        return this.authService.login(authArgs)
    }

    @Mutation(() => Token)
    @UseGuards(GqlAuthGuard)
    async refreshToken( @Context() context: GraphQLExecutionContext): Promise<Tokens> {
        const token = context["req"].headers.authorization.replace('Bearer ', '')
        return this.authService.refreshToken(token);
    }

}
