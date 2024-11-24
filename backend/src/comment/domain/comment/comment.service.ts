import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/comment/infra/comment/comment-repository.service';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { Comment } from '@prisma/client';
import { NotificationService } from 'src/notification/domain/notification/notification.service';
import { UserService } from 'src/user/domain/user/user.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly notificationService: NotificationService,
    private readonly userService: UserService
  ) {}

  async getAll(pictureId: string): Promise<Comment[]> {
    return await this.commentRepository.getAll(pictureId);
  }

  async create(
    authId: string,
    pictureId: string,
    dto: CreateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentRepository.create(authId, pictureId, dto);
    const user = await this.userService.getByAuthId(authId);

    await this.notificationService.createNotification(
      comment.picture.autor.authId,
      { content: 'Picture ' + comment.pictureId + ' has been commented by ' +  user.pseudo + ' !' }
    )
    comment.picture.autor.authId = undefined;
    return comment;
  }
}
