import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {UsersService} from "../../users/users.service";
import {ConfigService} from "@nestjs/config";
import {UserModel} from "../models/user.model";

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

    async validate(validationPayload: { email: string, sub: string }): Promise<UserModel | null> { // TODO: save this info to context

        console.log("validationPayload", validationPayload)

        // const decoded = this.jwtService.verify(token, {
        //     secret: this.configService.get("JWT_SECRET"),
        //
        // });
        //
        // const user = await this.usersService.getUser(decoded.email); // TODO: move to guard
        //
        // if (!user) {
        //     throw new Error("Unable to get user from decoded token.");
        // }

        return await this.usersService.getUser(validationPayload.email)
    }
}
