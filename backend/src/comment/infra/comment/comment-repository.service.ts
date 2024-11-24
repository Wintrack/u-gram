import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { CreateCommentDto } from 'src/comment/dto/create-comment.dto';
import { PrismaWrapper } from 'src/common/prisma-wrapper';
import { PrismaService } from 'src/prisma/infra/prisma/prisma.service';

@Injectable()
export class CommentRepository {
  private readonly prismaWrapper = new PrismaWrapper('Comment');

  constructor(private readonly prismaService: PrismaService) {}

  async getAll(pictureId: string): Promise<Comment[]> {
    return await this.prismaWrapper.execute(async () => {
      return this.prismaService.comment.findMany({
        where: {
          pictureId: pictureId,
        },
        include: {
          author: {
            select: {
              id: true,
              pseudo: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    });
  }

  async create(
    authId: string,
    pictureId: string,
    dto: CreateCommentDto,
  ): Promise<Comment & { picture: { autor: { authId: string } } }> {
    return await this.prismaWrapper.execute(async () => {
      return this.prismaService.comment.create({
        data: {
          text: dto.text,
          author: {
            connect: {
              authId: authId,
            },
          },
          picture: {
            connect: {
              id: pictureId,
            },
          },
        },
        include: {
          author: {
            select: {
              pseudo: true,
            },
          },
          picture: {
            select: {
              autor: {
                select: {
                  authId: true
                }
              }
            }
          }
        },
      });
    });
  }
}
