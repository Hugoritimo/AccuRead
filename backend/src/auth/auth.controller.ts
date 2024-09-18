/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString, IsNotEmpty } from 'class-validator';

class LoginDto {
    @IsString() // Garante que o valor seja uma string
    @IsNotEmpty() // Garante que o valor não esteja vazio
    username: string;

    @IsString() // Garante que o valor seja uma string
    @IsNotEmpty() // Garante que o valor não esteja vazio
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body: LoginDto) {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            throw new HttpException('Usuário ou senha inválidos', HttpStatus.UNAUTHORIZED);
        }
        return { message: 'Login bem-sucedido', user };
    }
}
