import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly password?: string;

  @ApiProperty()
  @Matches(/^[a-zA-ZÀ-ÿ\-'\s]+$/, {
    message: 'only letters, spaces, apostrophes and hyhens are allowed in name',
  })
  @Length(2, 64)
  @IsOptional()
  readonly pseudo?: string;

  @ApiProperty()
  @Matches(/^[a-zA-ZÀ-ÿ\-'\s]+$/, {
    message:
      'only letters, spaces, apostrophes and hyhens are allowed in firstname',
  })
  @Length(2, 64)
  @IsOptional()
  readonly firstname?: string;

  @ApiProperty()
  @Matches(/^[a-zA-ZÀ-ÿ\-'\s]+$/, {
    message: 'only letters, spaces, apostrophes and hyhens are allowed in name',
  })
  @Length(2, 64)
  @IsOptional()
  readonly lastname?: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsOptional()
  readonly phoneNumber?: string;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  readonly profilPictureId?: string;
}
