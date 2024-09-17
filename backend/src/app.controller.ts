/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('request-user-creation')
  async requestUserCreation(@Body() body: { username: string; email: string }) {
    if (!body.username || !body.email) {
      throw new HttpException('Faltam campos obrigatórios', HttpStatus.BAD_REQUEST);
    }

    const result = await this.authService.requestUserCreation(body.username, body.email);

    if (result.success) {
      return { success: true, message: 'Solicitação enviada com sucesso!' };
    } else {
      throw new HttpException(result.message || 'Erro ao enviar solicitação', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
