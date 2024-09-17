import { Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service'; // Importação corrigida para UsersService
import { UserSeeds } from './seeds/user.seeds'; // O caminho correto para o arquivo de seed

@Module({
  providers: [UsersService, UserSeeds], // Alteração para UsersService e UserSeeds
  exports: [UsersService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly userSeeds: UserSeeds) { }

  async onModuleInit() {
    await this.userSeeds.seedUsers(); // Inicializa os usuários padrão
  }
}
