import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @Length(1, 200)
  readonly text: string;
}
