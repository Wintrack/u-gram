import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/decorator/user/user';
import { AuthService } from 'src/auth/domain/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { GoogleOauthGuard } from 'src/auth/guard/google-oauth-guard/google-oauth.guard';
import { JwtGuard } from 'src/auth/guard/jwt/jwt.guard';
import { UserLogged } from 'src/auth/types/user-logged';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Loggin your account' })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @ApiOperation({ description: 'Loggin your account with google' })
  @UseGuards(GoogleOauthGuard)
  @Get('oauth-google')
  googleAuthRedirect(@User() user: UserLogged) {
    return this.authService.oauthLogin(user);
  }

  @ApiOperation({ description: 'Check if your are authenticated' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get('check')
  async check(@Req() req: any) {
    return req.user;
  }
}
