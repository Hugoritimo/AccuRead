/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
    // Array de usuários hardcoded (sem banco de dados)
    private readonly users = [
        { id: 1, username: 'victor.sousa', password: '!Projeta4359', role: 'admin' },
        { id: 2, username: 'befranio.junior', password: '!Projeta4359', role: 'user' },
        { id: 3, username: 'lucas.costa', password: '!Projeta4359', role: 'guest' },
    ];

    // Função que valida o nome de usuário e a senha
    async validateUser(username: string, password: string): Promise<any> {
        const user = this.users.find(
            (u) => u.username === username && u.password === password,
        );
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    // Função para solicitar a criação de um novo usuário e enviar o e-mail
    async requestUserCreation(username: string, email: string): Promise<{ success: boolean; message: string }> {
        await this.sendCreationRequestEmail(username, email);
        return { success: true, message: 'Solicitação enviada com sucesso! Um e-mail foi enviado ao administrador.' };
    }

    // Função para enviar o e-mail de solicitação de criação de usuário
    async sendCreationRequestEmail(username: string, email: string) {
        const transporter = nodemailer.createTransport({
            host: 'SMTP.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: 'seu-email@dominio.com',
                pass: 'sua-senha-de-aplicativo',
            },
        });

        const mailOptions = {
            from: 'seu-email@dominio.com',
            to: 'admin@dominio.com', // E-mail do administrador
            subject: 'Solicitação de Criação de Usuário',
            text: `Novo usuário solicitou a criação de uma conta.\n\nNome de usuário: ${username}\nE-mail: ${email}`,
        };

        return transporter.sendMail(mailOptions);
    }
}
