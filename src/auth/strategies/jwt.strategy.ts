import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import {UsersService} from "../../users/users.service";
import {jwtSecret} from "../constants";
import {User} from "../models/user";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        });
    }

    validate(validationPayload: {email: string, sub: string}): User | null {
        console.log("validate strategy", this.usersService.getUser(validationPayload.email))
        return this.usersService.getUser(validationPayload.email)
    }
}
