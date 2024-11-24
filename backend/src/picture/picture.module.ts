import { Module } from '@nestjs/common';
import { PictureService } from './domain/picture/picture.service';
import { PictureRepository } from './infra/picture/picture-repository.service';
import { PictureController } from './controller/picture/picture.controller';
import { NotificationModule } from 'src/notification/notification.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [NotificationModule, UserModule],
  providers: [PictureService, PictureRepository],
  controllers: [PictureController],
})
export class PictureModule {}
