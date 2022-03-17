import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "./models/user";
import {jwtSecret} from "./constants";

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {
    };

    private validatePassword(user: User): any {

        // const passwordIsValid = user.password === user.password;
        // return passwordIsValid ? user : null
        return null
    };

    public async login(user: User): Promise<{ accessToken: string, refreshToken: string }> {

        const existedUser = await this.usersService.getUser(user.email);

        if (!existedUser) {
            throw new UnauthorizedException();
        }

        const payload = {
            email: existedUser.email,
            sub: existedUser.userId
        }

        return {
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign({}, {expiresIn: "2592000s"})
        }
    };

    async tokenVerify(token: string): Promise<User> {

        const decoded = this.jwtService.verify(token, {
            secret: jwtSecret
        });

        const user = await this.usersService.getUser(decoded.email);

        if (!user) {
            throw new Error("Unable to get user from decoded token.")
        }

        return user
    }
}
