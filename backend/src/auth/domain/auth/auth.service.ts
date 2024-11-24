import { ForbiddenException, Injectable } from '@nestjs/common';
import { GetOrdCreateOAuthUserDto as GetOrCreateOAuthUserDto } from 'src/auth/dto/create-or-get-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AuthRepository } from 'src/auth/infra/auth/auth-repository.service';
import { JwtService } from 'src/auth/infra/jwt/jwt.service';
import { UserLogged } from 'src/auth/types/user-logged';
import { FileService } from 'src/file/domain/file/file.service';
import { v4 as uuidV4 } from 'uuid';


@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly fileService: FileService
  ) {}

  private async validateUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserLogged> {
    const auth = await this.authRepository.getByEmail(email);

    if (!auth || auth.password !== password) {
      throw new ForbiddenException('Forbidden Access');
    }
    return {
      id: auth.id,
      email: auth.email,
    };
  }

  async validateUserById(id: string): Promise<UserLogged> {
    const auth = await this.authRepository.getById(id);

    if (!auth) {
      throw new ForbiddenException('Forbidden Access');
    }
    return {
      id: auth.id,
      email: auth.email,
    };
  }

  async createOrGetUser(dto: GetOrCreateOAuthUserDto): Promise<UserLogged> {
    let auth = await this.authRepository.getByEmail(dto.email);

    if (auth) {
      return {
        id: auth.id,
        email: auth.email,
      };
    }

    const pseudo = 'user-' + uuidV4()
    const file = await this.fileService.uploadFromUrl(
      dto.pictureUrl,
      pseudo + '-profile-picture'
    );

    auth = await this.authRepository.createUser({
      email: dto.email,
      pseudo: pseudo,
      firstname: dto.firstname,
      lastname: dto.lastname,
      profilePictureId: file.id
    });
    return {
      id: auth.id,
      email: auth.email,
    };
  }

  async login(dto: LoginDto) {
    const userLogged = await this.validateUserByEmailAndPassword(
      dto.email,
      dto.password,
    );

    return this.jwtService.create(userLogged);
  }

  async oauthLogin(userLogged: UserLogged) {
    return this.jwtService.create(userLogged);
  }
}
