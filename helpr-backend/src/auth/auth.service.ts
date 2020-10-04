
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    
    constructor(
        private jwtService: JwtService) {}

    async login(req) {
        return {
            message: 'User information from google',
            access_token: this.jwtService.sign({ id: req.user.id }),
            username: req.user.username,
            companyId: req.user.companyId,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            email: req.user.email,
            photo: req.user.photo,
            userId: req.user.id
        }
    }

    async createToken(user: any): Promise<any> {
        return this.jwtService.sign({ id: user.id })
    }

    async requestGoogleRedirectUri(): Promise<{ redirect_uri: string } | any> {
        const scopes: string[] = [
           'profile', 
           'email'
        ];

        const queryParams: string[] = [
          `client_id=521010473477-a9mrljfidb26hvuiv8bacg76lelk64gd.apps.googleusercontent.com`,
          `redirect_uri=http://localhost:3000/auth/google/callback`,
          `response_type=code`,
          `scope=${scopes.join(' ')}`
        ];
        const redirect_uri: string = `https://accounts.google.com/o/oauth2/auth?${queryParams.join('&')}`;
    
        return {
          redirect_uri
        };
      }
}
