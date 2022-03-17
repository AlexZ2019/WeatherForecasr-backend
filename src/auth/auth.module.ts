import {Module} from "@nestjs/common";
import {AuthResolver} from "./auth.resolver";
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtSecret} from "./constants";
import {JwtStrategy} from "./strategies/jwt.strategy";


@Module({
    imports: [
        UsersModule,
        PassportModule.register({defaultStrategy: "jwt"}),
        JwtModule.register({
            secret: jwtSecret,
            signOptions: {expiresIn: "3600s"}
            // signOptions: {expiresIn: "10000000s"}
        })
    ],
    providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {

}
