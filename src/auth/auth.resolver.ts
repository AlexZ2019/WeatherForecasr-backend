import {Args, Query, Resolver} from "@nestjs/graphql";
import {AuthService} from "./auth.service";
import {User} from "./models/user";
import {authArgs} from "../dto/auth.dto";

@Resolver(() => User)

export class AuthResolver {

    constructor(private readonly authService: AuthService) {}

    // @Query(() => String)
    // getTest(): string {
    //     return "success"
    // }

    @Query(() => User)
    getAuth(@Args() authArgs: authArgs): User {
        console.log(authArgs)
        return this.authService.getAuth()
    }
}
