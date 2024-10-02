import { Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSeeds } from './seeds/user.seeds';
import { AuthModule } from './auth/auth.module';
import { PdfService } from './pdfgenerator/generatepdf.service';
import { PdfController } from './pdfgenerator/generatepdf.controller';
import { ExcelService } from './generatexlsx.service';
import { ExcelController } from './generatexlsx.controller';

// Sugestão: separar a lógica de seed em um módulo próprio `SeedsModule`
@Module({
  imports: [
    AuthModule,
    // Outros módulos que você precisar importar globalmente
  ],
  providers: [
    UsersService,
    UserSeeds,
    PdfService,
    ExcelService,
  ],
  controllers: [
    PdfController,
    ExcelController,
  ],
  exports: [
    UsersService,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly userSeeds: UserSeeds) { }

  // Sugestão: Rodar o processo de seed apenas quando necessário (não em produção)
  async onModuleInit() {
    // Adicione uma condição para rodar o seed apenas em desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
      await this.userSeeds.seedUsers();
    }
  }
}
