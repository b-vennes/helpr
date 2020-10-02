import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      clientID: '521010473477-a9mrljfidb26hvuiv8bacg76lelk64gd.apps.googleusercontent.com',
      clientSecret: 'DKg6fQl3_aCgfDlM6Ev5oGjw',
      callbackURL: 'http://localhost:3000/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, name, emails, photos } = profile;

    const firstName = name.givenName;
    const lastName = name.familyName;

    const existingUser = await this.userRepository.findOne({ passportId: id});

    if (!existingUser) {
      const newUser = await this.userRepository.save({
        username: emails[0].value,
        companyId: 1,
        passportId: id,
        firstname: firstName,
        lastname: lastName,
        email: emails[0].value,
        photo: photos[0].value
      } as User);

      done(null, newUser);
    } else {
      done(null, existingUser);
    }
  }
}