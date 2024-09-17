/* eslint-disable prettier/prettier */
import { Controller, Get, Patch, Param, Delete } from '@nestjs/common';
import { NotificationsService } from './notificantions.service';

@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    // Obter todas as notificações
    @Get()
    getNotifications() {
        return this.notificationsService.getAllNotifications();
    }

    // Marcar uma notificação como lida
    @Patch(':id/read')
    markAsRead(@Param('id') id: number) {
        return this.notificationsService.markAsRead(id);
    }

    // Excluir uma notificação
    @Delete(':id')
    deleteNotification(@Param('id') id: number) {
        return this.notificationsService.deleteNotification(id);
    }
}
