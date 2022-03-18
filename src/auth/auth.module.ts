import {Module} from "@nestjs/common";
import {AuthResolver} from "./auth.resolver";
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategies/jwt.strategy";


@Module({
    imports: [
        UsersModule,
        PassportModule.register({defaultStrategy: "jwt"}),
        JwtModule.register({}),
    ],
    providers: [AuthResolver, AuthService, JwtStrategy]
})
export class AuthModule {

}
