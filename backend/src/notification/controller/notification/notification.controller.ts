import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Notification } from '@prisma/client';
import { User } from 'src/auth/decorator/user/user';
import { JwtGuard } from 'src/auth/guard/jwt/jwt.guard';
import { UserLogged } from 'src/auth/types/user-logged';
import { NotificationService } from 'src/notification/domain/notification/notification.service';

@ApiBearerAuth()
@ApiTags('Notification')
@Controller('notification')
@UseGuards(JwtGuard)
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @ApiOperation({ description: 'Get all user notifications' })
    @Get()
    async getAllNotifications(
        @User() userLogged: UserLogged,
    ): Promise<Notification[]> {
        return await this.notificationService.getAllNotifications(userLogged.id);
    }
}
