/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
// Importar nodemailer se for usar para enviar e-mail
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  // Função que valida o nome de usuário e a senha (exemplo simplificado)
  private readonly users = [
    { id: 1, username: 'victor.sousa', password: 'hashed_password', role: 'admin' },
  ];

  // Função para solicitar a criação de um novo usuário e enviar o e-mail
  async requestUserCreation(username: string, email: string): Promise<{ success: boolean; message: string }> {
    // Enviar e-mail de solicitação de criação de usuário (exemplo com nodemailer)
    try {
      await this.sendCreationRequestEmail(username, email);
      return { success: true, message: 'Solicitação enviada com sucesso!' };
    } catch (error) {
      return { success: false, message: 'Erro ao enviar e-mail de solicitação de criação de usuário' };
    }
  }

  // Função para enviar o e-mail de solicitação de criação de usuário
  private async sendCreationRequestEmail(username: string, email: string) {
    const transporter = nodemailer.createTransport({
      host: 'SMTP.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER, // Certifique-se de que suas variáveis de ambiente estão definidas corretamente
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'admin@dominio.com', // E-mail do administrador
      subject: 'Solicitação de Criação de Usuário',
      text: `Novo usuário solicitou a criação de uma conta.\n\nNome de usuário: ${username}\nE-mail: ${email}`,
    };

    // Envia o e-mail
    return transporter.sendMail(mailOptions);
  }
}
