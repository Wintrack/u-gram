import { Module } from '@nestjs/common';
import { CommentService } from './domain/comment/comment.service';
import { CommentRepository } from './infra/comment/comment-repository.service';
import { CommentController } from './controller/comment/comment.controller';
import { NotificationModule } from 'src/notification/notification.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [NotificationModule, UserModule],
  providers: [CommentService, CommentRepository],
  controllers: [CommentController],
})
export class CommentModule {}
