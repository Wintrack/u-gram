import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepository } from './auth-repository.service';

describe('AuthRepositoryService', () => {
  let service: AuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRepository],
    }).compile();

    service = module.get<AuthRepository>(AuthRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
