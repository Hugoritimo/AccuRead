"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const ChangePasswordPage: React.FC = () => {
  const searchParams = useSearchParams();
  const initialUsername = searchParams.get("username") || "";
  const [username, setUsername] = useState<string>(initialUsername);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (initialUsername) {
      setUsername(initialUsername);
    }
  }, [initialUsername]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      username === "" ||
      oldPassword === "" ||
      newPassword === "" ||
      confirmNewPassword === ""
    ) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("As novas senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, oldPassword, newPassword }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          toast.success("Senha alterada com sucesso!");
          router.push("/login");
        } else {
          toast.error(result.message || "Erro ao alterar a senha");
        }
      } else {
        toast.error("Erro ao tentar alterar a senha, tente novamente.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao tentar alterar a senha, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <ToastContainer />
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-3xl">
        <CardHeader className="flex flex-col items-center mb-4">
          <Image
            src="/img/projeta.png"
            alt="Logo"
            width={120}
            height={120}
            className="animate-bounce"
          />
          <CardTitle className="text-center text-2xl font-bold text-gray-800 mt-4">
            Alterar Senha
          </CardTitle>
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                readOnly={!!initialUsername}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
              />
            </div>
            <div className="mb-6">
              <Label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Senha Antiga
              </Label>
              <Input
                id="oldPassword"
                type="password"
                placeholder="Digite sua senha antiga"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <Label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nova Senha
              </Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Digite sua nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="mb-6">
              <Label
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirmar Nova Senha
              </Label>
              <Input
                id="confirmNewPassword"
                type="password"
                placeholder="Confirme sua nova senha"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#af1b1b] hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg transition duration-300"
            >
              Alterar Senha
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
