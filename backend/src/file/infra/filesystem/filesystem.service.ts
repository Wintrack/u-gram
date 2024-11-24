import { Injectable } from '@nestjs/common';
import { File } from 'src/file/domain/file/types/file';
import { FileDescriptorRepository } from '../file-descriptor/file-descriptor-repository.service';
import { FileDescriptor } from 'src/file/domain/file/types/filedescriptor';
import { FileRepository } from '../file/file.service';

@Injectable()
export class FileSystemService {
  constructor(
    private readonly fileDescriptorRepository: FileDescriptorRepository,
    private readonly fileService: FileRepository
  ) {}

  async upload(file: File): Promise<FileDescriptor> {
    file.filedescriptor = await this.fileDescriptorRepository.create(
      file.filedescriptor,
    );

    await this.fileService.upload(file)
    return file.filedescriptor;
  }

  async updateFileData(file: File) {
    await this.fileService.update(file); 
  }

  async download(id: string): Promise<File> {
    const descriptor = await this.fileDescriptorRepository.getById(id);
    const data = await this.fileService.download(descriptor);

    return {
      filedescriptor: descriptor,
      data: data,
    };
  }
}
