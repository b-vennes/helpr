import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/user.entity';
import { UserProfile } from 'src/database/userprofile.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(UserProfile)
        private userProfileRepository: Repository<UserProfile>
    ) {
        super({
        clientID: '521010473477-a9mrljfidb26hvuiv8bacg76lelk64gd.apps.googleusercontent.com',
        clientSecret: 'DKg6fQl3_aCgfDlM6Ev5oGjw',
        callbackURL: 'http://localhost:3000/auth/google/callback',
        passReqToCallback: true,
        scope: ['profile', 'email']
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile, done: Function)
    {
        const { id, name, emails, photos } = profile;

        const existingUser = await this.userRepository.findOne({ passportId: id });

        if (!existingUser) {
            const newUser = await this.userRepository.save({
                username: emails[0].value,
                companyId: 1,
                passportId: id,
                firstname: name.givenName,
                lastname: name.familyName,
                email: emails[0].value,
                photo: photos[0].value
            } as User);

            const newUserProfile = {
                points: 0,
                title: "Helpr",
                aboutMe: "",
                userId: newUser.id
            }

            this.userProfileRepository.save(newUserProfile);

            done(null, newUser);
        } else {
            done(null, existingUser);
        }
    }
}
