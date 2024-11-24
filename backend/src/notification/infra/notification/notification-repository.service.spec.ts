import { Test, TestingModule } from '@nestjs/testing';
import { NotificationRepository } from './notification-repository.service';

describe('NotificationRepository', () => {
  let service: NotificationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationRepository],
    }).compile();

    service = module.get<NotificationRepository>(NotificationRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
