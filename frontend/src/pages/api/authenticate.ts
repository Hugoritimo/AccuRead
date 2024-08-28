import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { findUserByUsername } from "./storage";
import { serialize } from 'cookie';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { username, password } = req.body;

        const user = findUserByUsername(username);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                if (user.passwordTemporary) {
                    res.status(200).json({ success: true, temporary: true });
                } else {
                    res.status(200).json({ success: true, temporary: false });
                }
            } else {
                res.status(401).json({ success: false, message: "Nome de usuário ou senha incorretos" });
            }
        } else {
            res.status(401).json({ success: false, message: "Nome de usuário ou senha incorretos" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);

        const isAuthenticated = true;

        if (isAuthenticated) {
            const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 dias ou 1 dia
            res.setHeader('Set-Cookie', cookie);

            return res.status(200).json({ success: true });
        } else {
            return res.status(401).json({ success: false, message: 'Nome de usuário ou senha incorretos' });
        }
    }  else {
        return res.status(405).json({ message: 'Método não permitido' }); // Correção aqui
    }


}



