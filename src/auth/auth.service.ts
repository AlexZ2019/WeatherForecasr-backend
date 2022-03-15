import {Injectable} from "@nestjs/common";
import {User} from "./models/user";

@Injectable()
export class AuthService {

    private users: User[]

    public getAuth(): User {
        return {
            email: "test@com"
        }
    }
}
