import { Test, TestingModule } from '@nestjs/testing';
import { CommentRepository } from './comment-repository.service';

describe('CommentRepositoryService', () => {
  let service: CommentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentRepository],
    }).compile();

    service = module.get<CommentRepository>(CommentRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
