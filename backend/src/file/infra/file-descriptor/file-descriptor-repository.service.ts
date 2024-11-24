import { Injectable } from '@nestjs/common';
import { PrismaWrapper } from 'src/common/prisma-wrapper';
import { FileDescriptor } from 'src/file/domain/file/types/filedescriptor';
import { PrismaService } from 'src/prisma/infra/prisma/prisma.service';

@Injectable()
export class FileDescriptorRepository {
  private readonly prismaWrapper = new PrismaWrapper('FileDescriptor');

  constructor(private readonly prismaService: PrismaService) {}

  async create(file: FileDescriptor): Promise<FileDescriptor> {
    return await this.prismaWrapper.execute(async () => {
      return await this.prismaService.fileDescriptor.create({
        data: {
          name: file.name,
          mimeType: file.mimeType,
        },
      });
    });
  }

  async getById(id: string): Promise<FileDescriptor> {
    return await this.prismaWrapper.execute(async () => {
      return this.prismaService.fileDescriptor.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
    });
  }
}
