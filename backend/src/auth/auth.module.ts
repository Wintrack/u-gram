import { Global, Module } from '@nestjs/common';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './domain/auth/auth.service';
import { AuthRepository } from './infra/auth/auth-repository.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './infra/jwt/jwt.service';
import { JwtStrategy } from './strategy/jwt-strategy/jwt-strategy.service';
import { GoogleOauthStrategy } from './strategy/google-oauth-strategy/google-oauth-strategy.service';
import { FileModule } from 'src/file/file.module';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    FileModule
  ],
  providers: [AuthService, AuthRepository, JwtService, JwtStrategy, GoogleOauthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
