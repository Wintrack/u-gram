import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsInt, Min, Max } from "class-validator";
import { Transform } from 'class-transformer';

export class FindUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly containPseudo?: string;

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