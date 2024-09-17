"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, Check } from "lucide-react";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  // Função para carregar as notificações do backend
  const loadNotifications = async () => {
    try {
      const response = await axios.get("/api/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error("Erro ao carregar notificações", error);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`);
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Erro ao marcar como lida", error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`/api/notifications/${id}`);
      setNotifications(notifications.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Erro ao excluir notificação", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f9f9f9] p-6">
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
