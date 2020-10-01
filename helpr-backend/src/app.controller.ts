import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller()
export class AppController {
  
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getProfile(@Request() req) {
    return req.user;
  }
}
