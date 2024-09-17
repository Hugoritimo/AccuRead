/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    private notifications = [
        { id: 1, title: 'Novo relatório disponível', description: 'Seu relatório de obra do dia 12/08 está pronto para visualização.', read: false },
        { id: 2, title: 'Atualização de perfil', description: 'Seu perfil foi atualizado com sucesso.', read: true },
        { id: 3, title: 'Configurações de notificação alteradas', description: 'Suas preferências de notificação foram atualizadas.', read: false },
    ];

    getAllNotifications() {
        return this.notifications;
    }

    markAsRead(id: number) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.read = true;
        }
        return notification;
    }

    deleteNotification(id: number) {
        this.notifications = this.notifications.filter(n => n.id !== id);
        return { success: true };
    }
}
