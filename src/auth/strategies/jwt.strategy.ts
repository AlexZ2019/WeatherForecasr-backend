import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {UsersService} from "../../users/users.service";
import {ConfigService} from "@nestjs/config";
import {UserModel} from "../models/user.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private readonly usersService: UsersService,
                private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET")
        });
    }

    async validate(validationPayload: { email: string, sub: string }): Promise<UserModel> {

        return await this.usersService.getUser(validationPayload.email)
    }
}
