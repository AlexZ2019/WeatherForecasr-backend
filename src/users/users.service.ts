import { Injectable } from '@nestjs/common';
import {UsersEntity} from "./entities/usersEntity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

export type User = any;

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>) {
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


    async getUser(email: string): Promise<User | undefined> {
        // return await this.userRepository.findOne({email: email});
        return {email, sub: 1};
    }
}
