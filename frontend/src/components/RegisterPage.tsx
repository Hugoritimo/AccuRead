"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>(""); // Adicionando o campo de e-mail
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação para campos vazios
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    // Validação para senhas
    if (password !== confirmPassword) {
      toast.error("As senhas não correspondem.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/request-user-creation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password, // Enviando a senha também
          }),
        }
      );

      if (response.ok) {
        toast.success("Solicitação enviada com sucesso! Verifique seu e-mail.");
        router.push("/"); // Redirecionando para a página inicial
      } else {
        const result = await response.json();
        toast.error(result.message || "Erro ao enviar solicitação.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao enviar solicitação.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <ToastContainer />
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-3xl">
        <CardHeader>
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/img/projeta.png"
              alt="Logo"
              width={120}
              height={120}
              className="animate-bounce"
            />
            <CardTitle className="text-center text-3xl font-extrabold text-gray-800 mt-4">
              AccuRead Registro
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nome de Usuário
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu nome de usuário"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div className="mb-6">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div className="mb-6">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div className="mb-6">
              <Label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirmar Senha
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#af1b1b] hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-300"
            >
              Registrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
