import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { CreateNotification } from 'src/notification/dto/create-notification.dto';
import { NotificationRepository } from 'src/notification/infra/notification/notification-repository.service';

@Injectable()
export class NotificationService {
    constructor(private readonly notificationRepository: NotificationRepository) {}

    async createNotification(authId: string, dto: CreateNotification): Promise<Notification> {
        return await this.notificationRepository.createNotification(authId, dto);
    }

    async getAllNotifications(authId: string): Promise<Notification[]> {
        return await this.notificationRepository.getAllNotification(authId);
    }
}
