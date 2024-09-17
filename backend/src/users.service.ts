/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com' },
        { id: 2, username: 'user1', password: 'user123', email: 'user1@example.com' },
    ];

    async findUser(username: string) {
        return this.users.find((user) => user.username === username);
    }

    async validateUser(username: string, password: string) {
        const user = await this.findUser(username);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
}
