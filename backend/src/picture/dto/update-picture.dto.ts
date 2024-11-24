import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePictureDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @ApiProperty()
  @IsString({ each: true })
  readonly keyWords?: string[];

  @IsOptional()
  @ApiProperty()
  @IsString({ each: true })
  readonly mentions?: string[];

  @IsOptional()
  @ApiProperty()
  @IsUUID()
  readonly fileId?: string;
}
