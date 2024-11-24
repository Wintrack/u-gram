import { Injectable } from '@nestjs/common';
import { FileDescriptor } from './types/filedescriptor';
import { File } from './types/file';
import { FileSystemService } from 'src/file/infra/filesystem/filesystem.service';
import { ExternalFileDownloaderService } from 'src/file/infra/external-file-downloader/external-file-downloader.service';
import { ResizePictureDto } from 'src/file/dto/resize-picture.dto';
import * as resizeImg from 'resize-img';


@Injectable()
export class FileService {
  constructor(
    private readonly fileSystemService: FileSystemService,
    private readonly externalFileDownloader: ExternalFileDownloaderService
  ) {}

  async upload(file: File): Promise<FileDescriptor> {
    return await this.fileSystemService.upload(file);
  }

  async uploadFromUrl(url: string, fileName: string): Promise<FileDescriptor> {
    const file = await this.externalFileDownloader.downloadPicture(url, fileName);

    return await this.fileSystemService.upload(file);
  }

  async resizePicture(dto: ResizePictureDto) {
    let file = await this.fileSystemService.download(dto.id); 

    file.data = await resizeImg(file.data, { width: dto.width, height: dto.height });
    await this.fileSystemService.updateFileData(file);
  }

  async download(id: string): Promise<File> {
    return this.fileSystemService.download(id);
  }
}
