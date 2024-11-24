import { Injectable } from '@nestjs/common';
import { Picture, User } from '@prisma/client';
import { PrismaWrapper } from 'src/common/prisma-wrapper';
import { CreatePictureDto } from 'src/picture/dto/create-picture.dto';
import { FindPicturesDto } from 'src/picture/dto/find-pictures.dto';
import { UpdatePictureDto } from 'src/picture/dto/update-picture.dto';
import { PrismaService } from 'src/prisma/infra/prisma/prisma.service';

@Injectable()
export class PictureRepository {
  private readonly prismaWrapper = new PrismaWrapper('Picture');

  constructor(private readonly prismaService: PrismaService) { }

  async create(authId: string, dto: CreatePictureDto): Promise<Picture> {
    return await this.prismaWrapper.execute(async () => {
      return this.prismaService.picture.create({
        data: {
          description: dto.description,
          keyWords: dto.keyWords.map((keyWord) => keyWord.toLowerCase()),
          mentions: {
            connect: dto.mentions.map((id: string) => {
              return {
                id: id,
              };
            }),
          },
          autor: {
            connect: {
              authId: authId,
            },
          },
          file: {
            connect: {
              id: dto.fileId,
            },
          },
        },
        include: {
          mentions: {
            select: {
              id: true,
            },
          },
          likes: {
            select: {
              id: true,
              pseudo: true,
            },
          },
        },
      });
    });
  }

  async update(
    authId: string,
    id: string,
    dto: UpdatePictureDto,
  ): Promise<Picture> {
    return await this.prismaWrapper.execute(async () => {
      return this.prismaService.picture.update({
        where: {
          autor: {
            authId: authId,
          },
          id: id,
        },
        data: {
          description: dto?.description,
          keyWords: dto?.keyWords.map((keyWord) => keyWord.toLowerCase()),
          mentions: {
            set: dto?.mentions?.map((id: string) => {
              return {
                id: id,
              };
            }),
          },
          file: {
            connect: dto?.fileId ? { id: dto.fileId } : undefined,
          },
        },
        include: {
          mentions: {
            select: {
              id: true,
            },
          },
          likes: {
            select: {
              id: true,
              pseudo: true,
            },
          },
        },
      });
    });
  }

  async getById(id: string): Promise<Picture> {
    return await this.prismaWrapper.execute(async () => {
      return this.prismaService.picture.findUniqueOrThrow({
        where: {
          id: id,
        },
        include: {
          autor: {
            select: {
              id: true,
              pseudo: true,
            },
          },
          mentions: {
            select: {
              id: true,
            },
          },
          likes: {
            select: {
              id: true,
              pseudo: true,
            },
          },
        },
      });
    });
  }

  async getAllPictures(findPictures: FindPicturesDto): Promise<Picture[]> {
    const page = (findPictures.page) ? parseInt(findPictures.page) : 0;
    const limit = (findPictures.limit) ? parseInt(findPictures.limit) : 10;
    return await this.prismaWrapper.execute(async () => {
      return this.prismaService.picture.findMany({
        where: {
          autorId: findPictures.userId,
          description: findPictures.containInDescription ? {
            contains: findPictures.containInDescription,
            mode: 'insensitive',
          } : undefined,
          keyWords: findPictures.hasInKeywords ? {
            has: findPictures.hasInKeywords?.toLowerCase()
          } : undefined
        },
        include: {
          mentions: {
            select: {
              id: true,
            },
          },
          likes: {
            select: {
              id: true,
              pseudo: true,
            },
          },
        },
        orderBy: {
          createdAt:
            'desc'
        },
        skip: page * limit,
        take: limit,
      });
    });
  }

  async deleteByAuthIdAndId(authId: string, id: string): Promise<Picture> {
    return await this.prismaWrapper.execute(async () => {
      return this.prismaService.picture.delete({
        where: {
          id: id,
          autor: {
            authId: authId,
          },
        },
        include: {
          mentions: {
            select: {
              id: true,
            },
          },
        },
      });
    });
  }

  async getMostUsedKeywords(): Promise<string[]> {
    const result = await this.prismaService.picture.groupBy({
      by: ['keyWords'],
      _count: {
        keyWords: true,
      },
      orderBy: {
        _count: {
          keyWords: 'desc',
        },
      },
    });

    const keywords: string[][] = result.map((entry) => entry.keyWords);
    return keywords.flat();
  }
  
  async toggleLike(authId: string, id: string): Promise<Picture & { autor: { authId: string } }> {
    return await this.prismaWrapper.execute(async () => {
      const picture = await this.prismaService.picture.findUniqueOrThrow({
        where: {
          id: id,
        },
        include: {
          autor: {
            select: {
              authId: true,
            },
          },
          likes: {
            select: {
              authId: true,
            },
          },
        },
      });

      const alreadyLiked = picture?.likes.some((user: User) => user.authId === authId);

      return this.prismaService.picture.update({
        where: {
          id: id,
        },
        data: {
          likes: alreadyLiked ? {
            disconnect: {
              authId: authId,
            },
          } : {
            connect: {
              authId: authId,
            },
          },
        },
        include: {
          autor: {
            select: {
              id: true,
              pseudo: true,
              authId: true
            },
          },
          mentions: {
            select: {
              id: true,
            },
          },
          likes: {
            select: {
              id: true,
              pseudo: true,
            },
          },
        },
      });
    });
  }
}
