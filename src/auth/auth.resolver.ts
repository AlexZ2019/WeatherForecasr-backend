import {Args, Query, Resolver} from "@nestjs/graphql";
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
        console.log(authArgs)
        return this.usersService.getUser(authArgs.email);
    }

    @Query(() => Token)
    getLogin(@Args() authArgs: authArgs): {access_token: string} {
        return this.authService.login(authArgs as User)
    }
}
