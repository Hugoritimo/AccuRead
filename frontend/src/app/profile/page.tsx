"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [name, setName] = useState(""); // Estado para armazenar o nome do usuário
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/img/avatar-placeholder.png");
  const router = useRouter();

  // Função para buscar o perfil do usuário autenticado
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3001/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Usando o token de autenticação
          },
        });

        if (response.ok) {
          const data = await response.json();
          setName(data.name); // Atualizando o nome do usuário
          setEmail(data.email);
          setAvatarUrl(data.avatarUrl || "/img/avatar-placeholder.png");
        } else {
          console.error("Erro ao buscar perfil");
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    fetchProfile();
  }, []);

  // Função para salvar o perfil
  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/auth/update-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name, email }),
        }
      );

      if (response.ok) {
        alert("Perfil atualizado com sucesso!");
      } else {
        console.error("Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-f9f9f9 p-6">
      <header className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-333333">Perfil</h1>
        <Button
          variant="default"
          onClick={handleSave}
          className="bg-af1b1b text-white hover:bg-#cc1515"
        >
          Salvar Alterações
        </Button>
      </header>

      <Card className="w-full max-w-2xl mb-6 bg-ffffff border border-cccccc">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-333333">
            Informações do Usuário
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="cursor-pointer">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl} alt="Avatar do usuário" />
                <AvatarFallback>{name[0]}</AvatarFallback>
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
                  onChange={(e) => setName(e.target.value)} // Atualiza o estado do nome ao editar
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
                  onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email ao editar
                  className="w-full p-3 border border-cccccc rounded-lg"
                />
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
