import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
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
