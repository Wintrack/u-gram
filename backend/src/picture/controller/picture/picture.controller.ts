import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/decorator/user/user';
import { JwtGuard } from 'src/auth/guard/jwt/jwt.guard';
import { UserLogged } from 'src/auth/types/user-logged';
import { PictureService } from 'src/picture/domain/picture/picture.service';
import { CreatePictureDto } from 'src/picture/dto/create-picture.dto';
import { FindPicturesDto } from 'src/picture/dto/find-pictures.dto';
import { UpdatePictureDto } from 'src/picture/dto/update-picture.dto';

@ApiTags('Picture')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) { }

  @ApiOperation({ description: 'Create a picture' })
  @Post()
  async create(@User() userLogged: UserLogged, @Body() dto: CreatePictureDto) {
    return await this.pictureService.create(userLogged.id, dto);
  }

  @ApiOperation({ description: 'Update a picture' })
  @Put(':id')
  async update(
    @User() userLogged: UserLogged,
    @Param('id') id: string,
    @Body() dto: UpdatePictureDto,
  ) {
    return await this.pictureService.update(userLogged.id, id, dto);
  }

  @ApiOperation({ description: 'Search all most used picture keywords' })
  @Get('keywords')
  async getMostUsedKeywords(): Promise<string[]> {
    return await this.pictureService.getMostUsedKeywords();
  }

  @ApiOperation({ description: 'Search all most used picture keywords' })
  @Get()
  async getAll(
    @Query() dto: FindPicturesDto,
  ) {
    return await this.pictureService.getAll(dto);
  }

  @ApiOperation({ description: 'Search picture by id' })
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return await this.pictureService.getById(id);
  }

  @ApiOperation({ description: 'Delete picture by id' })
  @Delete('/:id')
  async deleteById(@User() userLogged: UserLogged, @Param('id') id: string) {
    return await this.pictureService.deleteByAuthIdAndId(userLogged.id, id);
  }

  @ApiOperation({ description: 'Add a like to a picture' })
  @Patch('/:id/like')
  async toggleLike(@User() userLogged: UserLogged, @Param('id') id: string) {
    return await this.pictureService.toggleLike(userLogged.id, id);
  }
}
