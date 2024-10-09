/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService, // Injeção do serviço JWT
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        throw new UnauthorizedException('Credenciais inválidas');
    }

    async login(username: string, password: string) {
        const user = await this.validateUser(username, password);
        const payload = { username: user.username, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload), // Gera o token JWT
        };
    }
}
