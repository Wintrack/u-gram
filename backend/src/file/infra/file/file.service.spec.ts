import { Test, TestingModule } from '@nestjs/testing';
import { FileRepository } from './file.service';

describe('FileService', () => {
  let service: FileRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileRepository],
    }).compile();

    service = module.get<FileRepository>(FileRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
