import { Module } from '@nestjs/common';
import { FileController } from './controller/file/file.controller';
import { FileService } from './domain/file/file.service';
import { S3Service } from './infra/s3/s3.service';
import { FileDescriptorRepository } from './infra/file-descriptor/file-descriptor-repository.service';
import { FileSystemService } from './infra/filesystem/filesystem.service';
import { S3Client } from '@aws-sdk/client-s3';
import { ExternalFileDownloaderService } from './infra/external-file-downloader/external-file-downloader.service';
import { HttpModule } from '@nestjs/axios';
import { FileRepository } from './infra/file/file.service';

@Module({
  imports: [HttpModule],
  controllers: [FileController],
  providers: [
    FileService,
    FileDescriptorRepository,
    S3Service,
    FileSystemService,
    FileRepository,
    {
      provide: S3Client,
      useFactory: FileModule.s3ClientFactory,
    },
    ExternalFileDownloaderService,
  ],
  exports: [FileService]
})
export class FileModule {
  static s3ClientFactory() {
    return new S3Client({
      region: process.env.AWS_S3_REGION,
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
      },
      endpoint: process.env.AWS_S3_URL,
    });
  }
}
