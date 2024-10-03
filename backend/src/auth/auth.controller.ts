/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Isso define a rota base como /auth
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login') // Isso define a rota como /auth/login
    async login(@Body() { username, password }: { username: string; password: string }) {
        return this.authService.login(username, password);
    }
}
