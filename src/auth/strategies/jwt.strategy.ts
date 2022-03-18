import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import {UsersService} from "../../users/users.service";
import {User} from "../models/user";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService,
                private readonly configService: ConfigService,
                ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET")
        });
    }

    validate(validationPayload: {email: string, sub: string}): User | null {
        return this.usersService.getUser(validationPayload.email)
    }
}
