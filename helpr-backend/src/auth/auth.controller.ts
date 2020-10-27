import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Get('google/uri')
    async requestGoogleRedirectUri() {
        return { 
            data: await this.authService.requestGoogleRedirectUri(), 
            status: 200
        };
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleLoginCallback(@Req() req, @Res() res)
    {
        if (req.user) {
            res.redirect('http://localhost:8080/#/loading/' + req.user.id);
        }
    }
}

