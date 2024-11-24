import { Module } from '@nestjs/common';
import { NotificationService } from './domain/notification/notification.service';
import { NotificationController } from './controller/notification/notification.controller';
import { NotificationRepository } from './infra/notification/notification-repository.service';

@Module({
  providers: [NotificationService, NotificationRepository],
  controllers: [NotificationController],
  exports: [NotificationService]
})
export class NotificationModule {
       
}
