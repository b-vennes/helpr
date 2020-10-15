import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { User } from 'src/database/user.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllUsersQuery } from './queries/handlers/get-users.handler';
import { GetUsersByUserIdQuery } from './queries/handlers/get-users-by-id.handler';
import { UpdateUserCommand } from './commands/handlers/update-user.handler';

@Controller('users')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
      ) {}

    @Get('getAllUsers')
    async getAllUsers(): Promise<User[]>  {
        return this.queryBus.execute(new GetAllUsersQuery());
    }

    @Get('getById/:id')
    async query(@Param('id') id: number): Promise<User> {
        return await this.queryBus.execute(new GetUsersByUserIdQuery(id));
    }

    @Put('updateUser')
    async updateUser(@Body() command: UpdateUserCommand) {
        return await this.commandBus.execute(new UpdateUserCommand(command.userId, command.firstname, command.lastname));
    }
}