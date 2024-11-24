import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';
import { UserService } from './domain/user/user.service';
import { UserRepository } from './infra/user/user-repository.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
