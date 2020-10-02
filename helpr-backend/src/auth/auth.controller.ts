import { Controller, UseGuards, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Get()
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req) {}

    @UseGuards(GoogleAuthGuard)
    @Get('redirect')
    async login(@Req() req) {
        return this.authService.login(req);
    }
}
