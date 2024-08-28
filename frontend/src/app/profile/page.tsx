"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [name, setName] = useState("victor Hugo");
  const [email, setEmail] = useState("victor.sousa@projetacs.com");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/img/avatar-placeholder.png");
  const router = useRouter();

  const handleSave = () => {
    alert("Perfil atualizado com sucesso!");
  };

  const handleAvatarChange = () => {
    alert("Função de alteração de avatar");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-f9f9f9 p-6">
      {/* Header */}
      <header className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-333333">Perfil</h1>
        <Button
          variant="primary"
          onClick={handleSave}
          className="bg-af1b1b text-white hover:bg-#cc1515"
        >
          Salvar Alterações
        </Button>
      </header>

      {/* Informações do Usuário */}
      <Card className="w-full max-w-2xl mb-6 bg-ffffff border border-cccccc">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-333333">
            Informações do Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div onClick={handleAvatarChange} className="cursor-pointer">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl} alt="Avatar do usuário" />
                <AvatarFallback>VH</AvatarFallback>
              </Avatar>
              <p className="text-sm text-333333 text-center mt-2">
                Alterar Avatar
              </p>
            </div>

            <form className="flex-1 space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-333333"
                >
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-cccccc rounded-lg"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-333333"
                >
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-cccccc rounded-lg"
                />
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-333333"
                >
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Deixe em branco para manter a mesma"
                  className="w-full p-3 border border-cccccc rounded-lg"
                />
              </div>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Seção de Configurações */}
      <Card className="w-full max-w-2xl bg-ffffff border border-cccccc">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-333333">
            Configurações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li>
              <Button
                variant="ghost"
                className="w-full text-left text-af1b1b hover:bg-ffd1d1"
              >
                Mudar Senha
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full text-left text-af1b1b hover:bg-ffd1d1"
              >
                Configurações de Notificação
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full text-left text-af1b1b hover:bg-ffd1d1"
              >
                Outras Configurações
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
