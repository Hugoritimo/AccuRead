/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity'; // Corrige a importação da entidade User

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User], // Certifique-se de importar a entidade corretamente
      synchronize: true,
    }),
    UserModule, // Certifique-se de importar o UserModule
    AuthModule, // Certifique-se de importar o AuthModule
  ],
})
export class AppModule { }
