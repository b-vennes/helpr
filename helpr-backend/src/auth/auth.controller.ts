import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-auth.guard';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @UseGuards(GoogleAuthGuard)
    @Get('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
