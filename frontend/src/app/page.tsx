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
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação simples para garantir que os campos estão preenchidos
    if (!username || !password) {
      toast.error("Por favor, preencha todos os campos.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Login bem-sucedido!");

        setTimeout(() => {
          router.push("/home"); // Redireciona para a página principal após login bem-sucedido
        }, 1000);
      } else {
        const result = await response.json();
        toast.error(result.message || "Nome de usuário ou senha incorretos");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao tentar fazer login, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-4">
      <ToastContainer />
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md p-8 shadow-2xl bg-white dark:bg-gray-900 rounded-3xl border border-brand-primary"
      >
        <Card>
          <CardHeader className="flex flex-col items-center mb-6">
            <Image
              src="/img/projeta.png"
              alt="Logo"
              width={100}
              height={100}
              className="mb-4"
            />
            <CardTitle className="text-center text-4xl font-extrabold text-brand-dark dark:text-brand-white">
              AccuRead RDO
            </CardTitle>
            <p className="text-center text-brand-gray dark:text-brand-white mt-2">
              Faça login para continuar
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label
                  htmlFor="username"
                  className="block text-sm font-medium text-brand-dark dark:text-brand-white mb-1"
                >
                  Nome de Usuário
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  className="w-full p-3 border border-brand-gray dark:border-gray-600 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-brand-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-brand-dark dark:text-brand-white mb-1"
                >
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className="w-full p-3 border border-brand-gray dark:border-gray-600 rounded-lg shadow-sm focus:ring-brand-primary focus:border-brand-primary dark:bg-gray-700 dark:text-brand-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-brand-primary focus:ring-brand-secondary border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <Label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                >
                  Lembrar-me
                </Label>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-300 dark:bg-brand-primary dark:hover:bg-brand-secondary"
                  disabled={isLoading}
                >
                  {isLoading ? (
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
              <Link href="/register">
                <span className="text-sm text-brand-gray hover:text-brand-dark dark:text-gray-400 dark:hover:text-brand-white cursor-pointer">
                  Não tem uma conta? Solicite uma
                </span>
              </Link>
              <br />
              <Link href="/forgot-password">
                <span className="text-sm text-brand-gray hover:text-brand-dark dark:text-gray-400 dark:hover:text-brand-white cursor-pointer">
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
