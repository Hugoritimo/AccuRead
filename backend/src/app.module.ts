/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSeeds } from './seeds/user.seeds';
import { AuthModule } from './auth/auth.module';
import { PdfService } from './pdfgenerator/generatepdf.service';
import { PdfController } from './pdfgenerator/generatepdf.controller';
import { ExcelService } from './generatexlsx.service';
import { ExcelController } from './generatexlsx.controller';

@Module({
  imports: [AuthModule],
  providers: [UsersService, UserSeeds, PdfService, ExcelService],
  controllers: [PdfController, ExcelController],
  exports: [UsersService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly userSeeds: UserSeeds) { }

  async onModuleInit() {
    await this.userSeeds.seedUsers();
  }
}
