/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users.service'; // Certifique-se de que o UsersService está corretamente implementado

@Module({
    imports: [], // Remova PassportModule e JwtModule, já que não estamos usando JWT
    providers: [AuthService, UsersService], // Certifique-se de incluir o UsersService
    controllers: [AuthController],
})
export class AuthModule { }
