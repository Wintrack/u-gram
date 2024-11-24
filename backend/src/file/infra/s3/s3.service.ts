import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { File } from 'src/file/domain/file/types/file';
import { FileDescriptor } from 'src/file/domain/file/types/filedescriptor';

@Injectable()
export class S3Service {
  constructor(private readonly client: S3Client) {}

  async upload(file: File) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: file.filedescriptor.fileId + '-' + file.filedescriptor.name,
        Body: file.data,
      }),
    );
  }

  async download(filedescriptor: FileDescriptor): Promise<Buffer> {
    const response = await this.client.send(
      new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: filedescriptor.fileId + '-' + filedescriptor.name,
      }),
    );
    const fileData = await response.Body.transformToByteArray();

    return Buffer.from(fileData);
  }

  async getFileUrl(filedescriptor: FileDescriptor): Promise<string> {
    return await getSignedUrl(
      this.client,
      new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: filedescriptor.fileId + '-' + filedescriptor.name,
      }),
      { expiresIn: 3600 },
    );
  }
}
