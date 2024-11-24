import { Injectable } from '@nestjs/common';
import { Picture } from '@prisma/client';
import { NotificationService } from 'src/notification/domain/notification/notification.service';
import { CreatePictureDto } from 'src/picture/dto/create-picture.dto';
import { FindPicturesDto } from 'src/picture/dto/find-pictures.dto';
import { UpdatePictureDto } from 'src/picture/dto/update-picture.dto';
import { PictureRepository } from 'src/picture/infra/picture/picture-repository.service';
import { UserService } from 'src/user/domain/user/user.service';

@Injectable()
export class PictureService {
  constructor(
    private readonly pictureRepository: PictureRepository,
    private readonly userService: UserService,
    private readonly notificationService: NotificationService
  ) {}

  async create(authId: string, dto: CreatePictureDto): Promise<Picture> {
    return await this.pictureRepository.create(authId, dto);
  }

  async update(authId: string, id: string, dto: UpdatePictureDto) {
    return await this.pictureRepository.update(authId, id, dto);
  }

  async getById(id: string) {
    return await this.pictureRepository.getById(id);
  }

  async getAll(findPicturesDto: FindPicturesDto) {
    return await this.pictureRepository.getAllPictures(findPicturesDto);
  }

  async getMostUsedKeywords(): Promise<string[]> {
    return await this.pictureRepository.getMostUsedKeywords();
  }

  async deleteByAuthIdAndId(authId: string, id: string) {
    return await this.pictureRepository.deleteByAuthIdAndId(authId, id);
  }

  async toggleLike(authId: string, id: string) {
    const picture = await this.pictureRepository.toggleLike(authId, id);
    const currentUser = await this.userService.getByAuthId(authId);
    
    await this.notificationService.createNotification(
      picture.autor.authId,
      { content: 'Picture ' + picture.id + ' has been liked by ' + currentUser.pseudo + ' !' }
    );
    return picture;
  }
}
