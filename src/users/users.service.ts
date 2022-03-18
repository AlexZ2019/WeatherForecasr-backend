import { Injectable } from '@nestjs/common';
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

export type User = any;

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }

    private readonly users = [
        {
            userId: 1,
            email: 'test@gmail.com',
            password: '123',
        },
        {
            userId: 2,
            email: 'test2@gmail.com',
            password: '123',
        },
    ];

    getUser(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }
}
