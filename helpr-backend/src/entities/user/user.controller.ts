import { Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import { User } from 'src/database/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('get')
    async getAll(): Promise<User[]>  {
        return this.userService.getAll();
    }

    @Get('query')
    async query(): Promise<User[]> {
        return this.userService.query();
    }

    @Post('create')
    async createUser(@Body() user: User): Promise<User> {
        return await this.userService.create(user);
    }

    @Put('update')
    async updateUser(@Body() user: User): Promise<any> {
        return await this.userService.update(user);
    }

    @Delete('delete')
    async deleteUser(@Body() user: User): Promise<any> {
        return await this.userService.delete(user);
    }
}