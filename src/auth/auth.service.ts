import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {User} from "./models/user";
import {jwtSecret} from "./constants";

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {};

    async validate(email: string, password: string): Promise<User> {
        const user = await this.usersService.getUser(email);

        if (!user) {
            return null
        }

        const passwordIsValid = password === user.password;
        return passwordIsValid ? user : null
    };

    login(user: User): {access_token: string} {
        const payload = {
            email: user.email,
            sub: user.userId
        }

        return {
            access_token: this.jwtService.sign(payload)
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
