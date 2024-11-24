import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaWrapper } from 'src/common/prisma-wrapper';
import { PrismaService } from 'src/prisma/infra/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FindUserDto } from 'src/user/dto/find-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class UserRepository {
  private readonly prismaWrapper = new PrismaWrapper('User');

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.prismaWrapper.execute(async () => {
      return this.prisma.user.create({
        data: {
          auth: {
            create: {
              email: createUserDto.email,
              password: createUserDto.password,
            },
          },
          pseudo: createUserDto.pseudo,
          firstname: createUserDto.firstname,
          lastname: createUserDto.lastname,
          phoneNumber: createUserDto.phoneNumber,
          profilPicture: {
            connect: {
              id: createUserDto.profilPictureId,
            },
          },
        },
      });
    });
  }

  async getAll(findUserDto: FindUserDto): Promise<User[]> {
    const page = (findUserDto.page) ? parseInt(findUserDto.page) : 0;
    const limit = (findUserDto.limit) ? parseInt(findUserDto.limit) : 10;
    return await this.prismaWrapper.execute(async () => {
      return this.prisma.user.findMany({
        where: {
          pseudo: findUserDto.containPseudo ? {
            contains: findUserDto.containPseudo
          } : undefined 
        },
        skip: page * limit,
        take: limit,
      });
    });
  }

  async getByAuthId(authId: string): Promise<User> {
    return await this.prismaWrapper.execute(async () => {
      return this.prisma.user.findUniqueOrThrow({
        where: {
          authId: authId,
        },
        include: {
          auth: true
        }
      });
    });
  }

  async getOneById(id: string): Promise<User> {
    return await this.prismaWrapper.execute(async () => {
      return this.prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
        include: {
          _count: {
            select: {
              pictures: true,
            },
          },
        },
      });
    });
  }

  async update(authId: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prismaWrapper.execute(async () => {
      return this.prisma.user.update({
        where: {
          authId: authId,
        },
        data: {
          auth: {
            update: {
              email: updateUserDto.email,
              password: updateUserDto.password,
            },
          },
          pseudo: updateUserDto.pseudo,
          firstname: updateUserDto.firstname,
          lastname: updateUserDto.lastname,
          phoneNumber: updateUserDto.phoneNumber,
          profilPicture: {
            connect: updateUserDto.profilPictureId
              ? { id: updateUserDto.profilPictureId }
              : undefined,
          },
        },
      });
    });
  }

  async deleteByAuthId(authId: string): Promise<void> {
    await this.prismaWrapper.execute(async () => {
      return this.prisma.auth.delete({
        where: {
          id: authId,
        }
      });
    });
  }
}
