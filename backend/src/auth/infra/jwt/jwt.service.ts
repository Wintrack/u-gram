import { Injectable } from '@nestjs/common';
import { UserLogged } from 'src/auth/types/user-logged';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  async create(userLogged: UserLogged) {
    return {
      access_token: this.nestJwtService.sign(userLogged),
    };
  }
}
