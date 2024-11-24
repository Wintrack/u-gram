import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { CreateNotification } from 'src/notification/dto/create-notification.dto';
import { PrismaService } from 'src/prisma/infra/prisma/prisma.service';

@Injectable()
export class NotificationRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async createNotification(authId: string, dto: CreateNotification) {
        return await this.prismaService.notification.create({
            data: {
                user: {
                    connect: {
                        authId: authId
                    }   
                },
                content: dto.content
            }
        })
    }

    async getAllNotification(authId: string): Promise<Notification[]> {
        return await this.prismaService.notification.findMany({
            where: {
                user: {
                    authId: authId
                }
            }
        })
    }
}
