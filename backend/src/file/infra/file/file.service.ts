import { Injectable } from '@nestjs/common';
import { File } from 'src/file/domain/file/types/file';
import { FileDescriptor } from 'src/file/domain/file/types/filedescriptor';
import { PrismaService } from 'src/prisma/infra/prisma/prisma.service';

@Injectable()
export class FileRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async upload(file: File) {
        await this.prismaService.file.create({
            data: {
                descriptorId: file.filedescriptor.id,
                data: file.data
            }
        })
    }

    async update(file: File) {
        await this.prismaService.file.update({
            where: {
                descriptorId: file.filedescriptor.id
            },
            data: {
                data: file.data
            }
        })
    }

    async download(filedescriptor: FileDescriptor): Promise<Buffer> {
        const file = await this.prismaService.file.findUnique({
            where: {
                descriptorId: filedescriptor.id
            }
        })

        return file.data
    }
}
