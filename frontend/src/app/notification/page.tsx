"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, Check } from "lucide-react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Novo relatório disponível",
      description:
        "Seu relatório de obra do dia 12/08 está pronto para visualização.",
      read: false,
    },
    {
      id: 2,
      title: "Atualização de perfil",
      description: "Seu perfil foi atualizado com sucesso.",
      read: true,
    },
    {
      id: 3,
      title: "Configurações de notificação alteradas",
      description: "Suas preferências de notificação foram atualizadas.",
      read: false,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9f9f9] p-6">
      {/* Header */}
      <header className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#af1b1b]">Notificações</h1>
        <Button
          variant="ghost"
          onClick={() => setNotifications([])}
          className="text-[#af1b1b] hover:bg-[#fce4e4] p-2 rounded-md"
        >
          Limpar Todas
        </Button>
      </header>

      {/* Lista de Notificações */}
      <div className="w-full max-w-2xl space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className="flex justify-between items-center bg-white border border-[#af1b1b] rounded-lg p-4 shadow-sm"
            >
              <div>
                <CardHeader>
                  <CardTitle className="flex items-center text-[#333333]">
                    {notification.title}
                    {!notification.read && (
                      <Badge className="ml-2 bg-[#af1b1b] text-white">
                        Nova
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-[#666666]">
                  <p>{notification.description}</p>
                </CardContent>
              </div>
              <div className="flex space-x-2">
                {!notification.read && (
                  <Button
                    variant="ghost"
                    onClick={() => markAsRead(notification.id)}
                    className="text-[#af1b1b] hover:bg-[#fce4e4]"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Marcar como lida
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={() => deleteNotification(notification.id)}
                  className="text-[#af1b1b] hover:bg-[#fce4e4]"
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Excluir
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-[#666666]">
            Você não tem novas notificações.
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
