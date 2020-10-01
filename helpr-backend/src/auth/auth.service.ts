
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'database/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService) {}

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({ id: user.id })
    };
  }
}
