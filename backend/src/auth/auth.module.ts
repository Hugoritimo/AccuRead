/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; // Certifique-se de importar o controlador
import { UserModule } from '../users/user.module'; // Importe o UserModule também, se necessário

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule, // Se necessário
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
            }),
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController], // Certifique-se de que o controlador está listado aqui
    exports: [AuthService],
})
export class AuthModule { }
