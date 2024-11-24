import { Injectable } from '@nestjs/common';
import { Auth } from '@prisma/client';
import { CreateOAuthUser } from 'src/auth/types/create-oauth-user';
import { PrismaService } from 'src/prisma/infra/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getByEmail(email: string): Promise<Auth> {
    return await this.prismaService.auth.findUnique({
      where: {
        email: email,
      },
    });
  }

  async createUser(dto: CreateOAuthUser) {
    return await this.prismaService.auth.create({
      data: {
        email: dto.email,
        isExternalAuth: true,
        user: {
          create: {
            pseudo: dto.pseudo,
            firstname: dto.firstname,
            lastname: dto.lastname,
            profilPictureId: dto.profilePictureId,
          }
        }
      }
    })
  }

  async getById(id: string) {
    return await this.prismaService.auth.findUnique({
      where: {
        id: id,
      },
    });
  }
}
