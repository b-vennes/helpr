
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'database/user.entity';

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
}
