import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindPicturesDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly userId?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly orderByCreation?: 'true' | 'false';

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly containInDescription: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly hasInKeywords: string;

  @ApiProperty({ required: false, default: 0 })
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @Min(0)
  @IsOptional()
  readonly page: string;

  @ApiProperty({ required: false, default: 10 })
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  @Min(0)
  @Max(50)
  @IsOptional()
  readonly limit: string;
}