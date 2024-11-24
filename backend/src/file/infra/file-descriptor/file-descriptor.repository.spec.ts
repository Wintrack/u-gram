import { Test, TestingModule } from '@nestjs/testing';
import { FileDescriptorRepository } from './file-descriptor-repository.service';

describe('FileDescriptorRepository', () => {
  let service: FileDescriptorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileDescriptorRepository],
    }).compile();

    service = module.get<FileDescriptorRepository>(FileDescriptorRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
