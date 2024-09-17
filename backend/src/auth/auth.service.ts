/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
    // O serviço lida com a solicitação de criação de usuário e envio de e-mail
    async requestUserCreation(username: string, email: string): Promise<{ success: boolean; message?: string }> {
        // Envia um e-mail para o administrador com os dados do usuário
        await this.sendCreationRequestEmail(username, email);

        return { success: true, message: 'Solicitação enviada com sucesso! Um e-mail foi enviado ao administrador.' };
    }

    async sendCreationRequestEmail(username: string, email: string) {
        // Configura o transporte SMTP para o servidor Exchange
        const transporter = nodemailer.createTransport({
            host: 'SMTP.office365.com', // Servidor SMTP do Outlook/Exchange
            port: 587, // Porta padrão para STARTTLS
            secure: false, // Utilize 'false' para STARTTLS
            auth: {
                user: 'victor.sousa@projetacs.com', // Seu e-mail do Exchange
                pass: 'senha_de_aplicativo_aqui', // Substitua pela senha de aplicativo gerada
            },
            tls: {
                ciphers: 'SSLv3', // Garantir segurança na conexão TLS
            },
        });

        // Configuração do e-mail
        const mailOptions = {
            from: 'victor.sousa@projetacs.com',
            to: 'victor.sousa@projetacs.com', // E-mail do administrador
            subject: 'Solicitação de Criação de Usuário',
            text: `Novo usuário solicitou a criação de uma conta.\n\nNome de usuário: ${username}\nE-mail: ${email}`,
        };

        // Enviar o e-mail
        return transporter.sendMail(mailOptions);
    }
}
