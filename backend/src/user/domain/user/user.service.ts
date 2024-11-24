import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { FindUserDto } from 'src/user/dto/find-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserRepository } from 'src/user/infra/user/user-repository.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async getAll(findUserDto: FindUserDto) {
    return await this.userRepository.getAll(findUserDto);
  }

  async getByAuthId(authId: string) {
    return await this.userRepository.getByAuthId(authId);
  }

  async getById(id: string) {
    return await this.userRepository.getOneById(id);
  }

  async update(authId: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(authId, updateUserDto);
  }

  async deleteByAuthId(authId: string) {
    await this.userRepository.deleteByAuthId(authId);
  }
}
