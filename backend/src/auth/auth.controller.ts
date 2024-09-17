/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Define a rota base como /auth
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login') // Define a sub-rota como /auth/login para POST
    async login(@Body() body: { username: string; password: string }) {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            throw new HttpException('Usuário ou senha inválidos', HttpStatus.UNAUTHORIZED);
        }
        return { message: 'Login bem-sucedido', user };
    }
}
