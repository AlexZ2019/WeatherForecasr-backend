import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "./models/user";
import {ACCESS_TOKEN_TIMEOUT, jwtSecret, REFRESH_TOKEN_TIMEOUT} from "./constants";
import {Tokens} from "./types";

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {};

    private validatePassword(user: User): any {

        // const passwordIsValid = user.password === user.password;
        // return passwordIsValid ? user : null
        return null
    };

    private generateTokens(payload) {
        return {
            accessToken: this.jwtService.sign(payload, {expiresIn: ACCESS_TOKEN_TIMEOUT}),
            refreshToken: this.jwtService.sign(payload, {expiresIn: REFRESH_TOKEN_TIMEOUT})
        }
    }

    public async login(user: User): Promise<Tokens> {

        const existedUser = await this.usersService.getUser(user.email);

        if (!existedUser) {
            throw new UnauthorizedException();
        }

        const payload = {
            email: existedUser.email,
            sub: existedUser.userId
        }

        return this.generateTokens(payload);
    };

    public async tokenVerify(token: string): Promise<User> {

        const decoded = this.jwtService.verify(token, {
            secret: jwtSecret,

        });

        const user = await this.usersService.getUser(decoded.email);

        if (!user) {
            throw new Error("Unable to get user from decoded token.");
        }

        return user;
    }

    public refreshToken(refreshToken: string) {
        const decoded = this.jwtService.verify(refreshToken, {
            secret: jwtSecret
        });

        const payload = {
            email: decoded.email,
            sub: decoded.sub
        }

        return this.generateTokens(payload);
    }
}
