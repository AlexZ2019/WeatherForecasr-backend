import {Args, Mutation, Query, Resolver} from "@nestjs/graphql";
import {Token, User} from "./models/user";
import {authArgs} from "./dto/auth.dto";
import {UseGuards} from "@nestjs/common";
import {GqlAuthGuard} from "./guards/gql-auth.guard";
import {UsersService} from "../users/users.service";
import {AuthService} from "./auth.service";

@Resolver(() => User)

export class AuthResolver {

    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}

    @Query(() => User)
    @UseGuards(GqlAuthGuard)
    getAuth(@Args() authArgs: authArgs): User {
        return this.usersService.getUser(authArgs.email);
    }

    @Mutation(() => Token)
    async getLogin(@Args() authArgs: authArgs): Promise<{ accessToken: string, refreshToken: string }> {
        return this.authService.login(authArgs)
    }
}
