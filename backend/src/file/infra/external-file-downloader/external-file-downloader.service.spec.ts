import { Test, TestingModule } from '@nestjs/testing';
import { ExternalFileDownloaderService } from './external-file-downloader.service';

describe('ExternalFileDownloaderService', () => {
  let service: ExternalFileDownloaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalFileDownloaderService],
    }).compile();

    service = module.get<ExternalFileDownloaderService>(ExternalFileDownloaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
