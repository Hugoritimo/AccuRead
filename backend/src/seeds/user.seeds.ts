/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserSeeds {
    private readonly users = [
        { id: 1, username: 'victor.sousa', password: '!Projeta4359', role: 'admin' },
        { id: 2, username: 'befranio.junior', password: '!Projeta4359', role: 'user' },
        { id: 3, username: 'lucas.costa', password: '!Projeta4359', role: 'guest' },
    ];

    async seedUsers(): Promise<void> {
        console.log('Seed de usuários padrão executado:', this.users);
        // Aqui você pode implementar a lógica para adicionar esses usuários ao sistema
    }
}
