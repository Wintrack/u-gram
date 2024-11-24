import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from 'src/auth/domain/auth/auth.service';
import { UserLogged } from 'src/auth/types/user-logged';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            clientID: process.env.GOOGLE_OAUTH_ID,
            clientSecret: process.env.GOOGLE_OAUTH_PRIVATE,
            callbackURL: process.env.BACKEND_BASE_URL + '/auth/oauth-google',
            scope: ['email', 'profile'],
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any
    ): Promise<UserLogged> {
        const { name, emails, photos } = profile;
        const googleUser = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
            refreshToken,
        }


        return await this.authService.createOrGetUser({
            email: googleUser.email,
            firstname: googleUser.firstName,
            lastname: googleUser.lastName,
            pictureUrl: googleUser.picture
        });
    }
}
