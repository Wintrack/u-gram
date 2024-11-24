import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePictureDto {
  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsString({ each: true })
  readonly keyWords: string[];

  @ApiProperty()
  @IsString({ each: true })
  readonly mentions: string[];

  @ApiProperty()
  @IsUUID()
  readonly fileId: string;
}
