"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState<string>(""); // Estado para o nome de usuário.
  const [password, setPassword] = useState<string>(""); // Estado para a senha.
  const [rememberMe, setRememberMe] = useState<boolean>(false); // Estado para lembrar-me.
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para controlar o carregamento do botão.
  const router = useRouter(); // Hook para navegação entre páginas.

  // Função chamada ao enviar o formulário.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário.
    setIsLoading(true); // Ativa o estado de carregamento.

    // Validação para garantir que os campos foram preenchidos.
    if (!username || !password) {
      toast.error("Por favor, preencha todos os campos."); // Exibe erro se os campos estiverem vazios.
      setIsLoading(false); // Desativa o estado de carregamento.
      return;
    }

    try {
      // Fazendo a chamada para a API de login.
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Define o cabeçalho como JSON.
        body: JSON.stringify({ username, password }), // Envia os dados de login no corpo da requisição.
      });

      // Verifica se o login foi bem-sucedido.
      if (response.ok) {
        const result = await response.json(); // Obtém a resposta.
        toast.success("Login bem-sucedido!"); // Exibe mensagem de sucesso.

        // Redireciona para a página inicial após o login bem-sucedido.
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } else {
        const result = await response.json(); // Obtém a resposta de erro.
        toast.error(result.message || "Nome de usuário ou senha incorretos"); // Exibe a mensagem de erro.
      }
    } catch (error) {
      console.error(error); // Exibe o erro no console.
      toast.error("Erro ao tentar fazer login, tente novamente."); // Exibe um erro genérico ao tentar fazer login.
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-4">
      {/* Container principal com fundo gradiente claro e escuro */}
      <ToastContainer /> {/* Componente de notificações */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 }, // Animação inicial (escondido).
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Animação visível.
        }}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md p-8 shadow-2xl bg-white dark:bg-gray-900 rounded-3xl border border-brand-primary"
      >
        {/* Div para o card de login com animação do Framer Motion */}
        <Card>
          <CardHeader className="flex flex-col items-center mb-6">
            {/* Cabeçalho do card */}
            <Image
              src="/img/projeta.png" // Caminho da imagem (logo).
              alt="Logo" // Texto alternativo da imagem.
              width={100} // Largura da imagem.
              height={100} // Altura da imagem.
              className="mb-4" // Classe para margens.
            />
            <CardTitle className="text-center text-4xl font-extrabold text-brand-dark dark:text-white">
              {/* Título do card */}
              AccuRead RDO
            </CardTitle>
            <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
              {/* Descrição abaixo do título */}
              Faça login para continuar
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Formulário de login */}
              <div>
                <Label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Nome de Usuário
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Atualiza o estado com o valor do input.
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Atualiza o estado com o valor da senha.
                  required
                />
              </div>
              <div className="flex items-center">
                {/* Checkbox para "Lembrar-me" */}
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={rememberMe} // Estado do checkbox.
                  onChange={(e) => setRememberMe(e.target.checked)} // Atualiza o estado com o valor do checkbox.
                />
                <Label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  Lembrar-me
                </Label>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }} // Animação ao passar o mouse.
                whileTap={{ scale: 0.95 }} // Animação ao clicar.
              >
                <Button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-300"
                  disabled={isLoading} // Desabilita o botão enquanto está carregando.
                >
                  {isLoading ? (
                    // Mostra o indicador de carregamento enquanto o login está em progresso.
                    <span className="flex items-center justify-center">
                      <span className="loader mr-2" /> Carregando...
                    </span>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </motion.div>
            </form>
            <div className="mt-6 text-center">
              {/* Link para registro */}
              <Link href="/register">
                <span className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 cursor-pointer">
                  Não tem uma conta? Solicite uma
                </span>
              </Link>
              <br />
              {/* Link para recuperação de senha */}
              <Link href="/forgot-password">
                <span className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 cursor-pointer">
                  Esqueceu sua senha?
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
