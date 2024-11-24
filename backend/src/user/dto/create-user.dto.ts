import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @Matches(/^[a-z0-9._]+$/, {
    message:
      'only lowercase letters, numbers , . and _ are allowed in username',
  })
  @Length(4, 32)
  readonly pseudo: string;

  @ApiProperty()
  @Matches(/^[a-zA-ZÀ-ÿ\-'\s]+$/, {
    message:
      'only letters, spaces, apostrophes and hyhens are allowed in firstname',
  })
  @Length(2, 64)
  readonly firstname: string;

  @ApiProperty()
  @Matches(/^[a-zA-ZÀ-ÿ\-'\s]+$/, {
    message: 'only letters, spaces, apostrophes and hyhens are allowed in name',
  })
  @Length(2, 64)
  readonly lastname: string;

  @ApiProperty()
  @IsPhoneNumber()
  readonly phoneNumber: string;

  @ApiProperty()
  @IsUUID()
  readonly profilPictureId: string;
}
