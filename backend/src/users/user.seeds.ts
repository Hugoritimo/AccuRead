/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from './user.service';

@Injectable()
export class UserSeeds {
    constructor(private readonly usersService: UsersService) { }

    /*************  ✨ Codeium Command 🌟  *************/
    /**
     * Seeds the users table with the default users.
     */
    async seedUsers() {
        /**
         * Array of default users.
         */
        const users = [
            { id: 1, username: 'victor.sousa', password: '!Projeta4359', role: 'admin' },
            { id: 2, username: 'befranio.junior', password: '!Projeta4359', role: 'user' },
            { id: 3, username: 'lucas.costa', password: '!Projeta4359', role: 'guest' },
            { id: 4, username: 'teste', password: '!Projeta4359', role: 'guest' },
            { id: 5, username: 'carlos.victor', password: '!Projeta4359', role: 'guest' },
        ];

        /**
         * Check if the user already exists in the database. If not, create it.
         */
        for (const user of users) {
            const existingUser = await this.usersService.findByUsername(user.username);
            if (!existingUser) {
                await this.usersService.create(user); // Método que cria o usuário
            }
        }
    }
}
