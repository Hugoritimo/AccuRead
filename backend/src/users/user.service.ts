/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, username: 'victor.sousa', password: '!Projeta4359', role: 'admin' },
        { id: 2, username: 'befranio.junior', password: '!Projeta4359', role: 'user' },
        { id: 3, username: 'lucas.costa', password: '!Projeta4359', role: 'guest' },
    ];

    async findByUsername(username: string) {
        return this.users.find((user) => user.username === username);
    }

    async create(user: any) {
        this.users.push(user);
    }
}
