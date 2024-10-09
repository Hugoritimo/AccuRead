/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { User } from './users.entity'; // Verifique se o nome do arquivo é 'users.entity.ts' e não 'user.entity.ts'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService],
    controllers: [UserController],
    exports: [UsersService],
})
export class UserModule { }
