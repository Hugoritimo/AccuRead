/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class UserSeeds {
    constructor(private readonly usersService: UsersService) { }

    async seedUsers() {
        const users = [
            { id: 1, username: 'victor.sousa', password: '!Projeta4359', role: 'admin' },
            { id: 2, username: 'befranio.junior', password: '!Projeta4359', role: 'user' },
            { id: 3, username: 'lucas.costa', password: '!Projeta4359', role: 'guest' },
        ];

        for (const user of users) {
            const existingUser = await this.usersService.findByUsername(user.username);
            if (!existingUser) {
                await this.usersService.create(user); // Método que cria o usuário
            }
        }
    }
}
