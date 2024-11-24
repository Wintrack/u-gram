import { Test, TestingModule } from '@nestjs/testing';
import { PictureRepository } from './picture-repository.service';

describe('PictureRepositoryService', () => {
  let service: PictureRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PictureRepository],
    }).compile();

    service = module.get<PictureRepository>(PictureRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
